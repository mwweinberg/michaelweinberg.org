---
layout: post
category: blog
title: Bluesky Bot to Translate Local News
date: 2025-01-10
tags:
- projects
- python
image:
     feature: german_mail_coach.jpg

---

I made a [bot](https://bsky.app/profile/berlin-news-en.bsky.social) that automatically translates bluesky tweets* from a list of accounts into english.  It is written in python.

I recently relocated to Berlin.  Since I don’t speak german (yet?), I’ve been looking for ways to stay up to date with local news.  There are a handful of english-language publications that cover Berlin and Germany, and I appreciate all of them. However, by necessity, they are not resourced to be comprehensive local news resources.

As you would expect, there is also a robust local german-language press.  I read their sites, but since I haven’t found a way to turn on auto-translate at the domain level, there is friction in waiting to translate each story (yes, this thing is partially motivated by the comically first world problem of having to click an extra button for a robot to translate an article for me).  

Bluesky has become a good way for me to get an ambient sense of what’s going on in the world, with pointers to articles that can give me more context. However, the reporters for the local press tweet in german.  Fortunately, bluesky has a pretty open and robust API.  What if I made a bot that posts translated tweets so they just integrate into the rest of my doom scrolling? 

## Workflow

You could build a bot like this by attaching to the bluesky firehose, filtering for the accounts you care about, and then going from there. However, as ‘firehose’ suggests, that requires receiving and filtering the entire stream of all bluesky posts.  Fortunately, all bluesky accounts are also RSS feeds. That means I can use existing python libraries to pull data from them selectively.  

The workflow for the bot starts with a list of accounts. It is an [actual bluesky list that the bot account maintains](https://bsky.app/profile/berlin-news-en.bsky.social/lists/3lg424mfsl42l), although it could be any public bluesky list.   

When the python script starts, it creates objects for each of the users in the list and saves the current time.  Then, every 2 minutes it checks the RSS feed for each of the accounts in the list. If the latest post in the RSS feed is newer than the time the script started, the script:

- extracts the text of the tweet
- sends the extracted text to the google translate API (if you have hit the daily limit on google, it rolls over to azure)
- builds a new tweet that includes the source handle (with a link to the account - not a mention because I assume that would be annoying), the tweet text (including any links), and a link to the original tweet
- resets the “is the latest post time newer than” time to the time of that post, so it knows not to deal with the account again until there is an even newer post

As of now, the bot does not support RT/comments or images because those do not show up in the RSS feeds. 

## The Code

The full repo is [here](https://github.com/mwweinberg/bluesky_de).  

### Importing Secrets 

The script itself starts by importing a bunch of libraries, including a local library.  That library is a separate file called `secrets.py`.  As the name suggests, this is where user-specific secrets live.  

If you are using this yourself, you can open `example-secrets.py`:

```
translation_api_key = 'YOUR GOOGLE TRANSLATE API KEY'
user_name = 'ACCOUNT NAME (NO @ SYMBOL)'
password = 'PASSWORD'
azure_key = 'YOUR AZURE KEY'
azure_location = 'YOUR AZURE LOCATION'
azure_endpoint = 'YOUR AZURE ENDPOINT'
```

add your personal variables, and save it as `secrets.py`. The `user_name` and `password` are for the bluesky account you want to do the tweeting (make sure you have an app-specific password for this, not your general bluesky account password).  `translation_api_key` is for the google translate account that will be doing the translating. THe azure related variables are for the azure account.

### Variables and Initial Setup 

The next chunk of code sets up some initial variables.  It sets the language to translate to, imports the api keys, and initializes the bluesky client.  The last thing it does is identify the list of accounts to be followed.  For example, my bot follows this list: [https://bsky.app/profile/berlin-news-en.bsky.social/lists/3lg424mfsl42l](https://bsky.app/profile/berlin-news-en.bsky.social/lists/3lg424mfsl42l).  Using native bluesky lists makes it easy to add new accounts to the bot. 

### Azure Translation Setup

The next section sets up headers and variables for the Azure translation. Both Google and Azure have free tiers of their translation API.  Since tweets are definitionally small amounts of data, it should be easy to stay below the limits.  The bot is currently set up to start with google and then roll over to Azure once the limit is set, but you could also just switch the sequence.

### Getting the Users

The first thing that the code really does is create a bunch of user objects.  Each object represents a user and has elements: `user_name`, `last_post_time`, `rss_url`, `target_profile_url`, and `DID`.  These objects are added to the `user_holder` list. The functions in this section get the usernames from the list, pull the relevant RSS feed urls (which is buried in the source code for each user profile page), and sets the `last_post_time`.  For reasons that I do not fully understand, the RSS feed of a small subset of public bluesky accounts returns a 403 error.  If the rss url does not exist, or if it does exist but only throws an error, the account is not added to the `user_holder` list:

```python
     if rss_url == 'error':
          print("did not create object for " +i + " because the link did not exist")
     elif feedparser.parse(rss_url).status == 403:
          print("did not create object for " +i + " because the link threw a 403 error")
     else:'

          user_holder.append(User(i, last_post_time, rss_url, target_profile_url, user_DID))
          #this is just a better way to confirm things are working at startup
          print(f'created object for {i}')
```

It also repeats this action at the start of every loop, so it will pick up accounts that have been added to the list while it is running

### Get Tweets, Translate Them, and Post

When the script starts, it sets the last post time for each account at that moment.  Every 2 minutes, it checks to see if there is a tweet that was posted more recently than that last post time. If so, pulls the text of the new tweet, sends it to be translated, puts together a new tweet, sends it out, and updates the last post time accordingly.  The functions that do that are reasonably well labeled, but there are some things worth flagging:

- The translation APIs have problems with quotes and hashes, so they are replaced before they are sent to translation (`uncleaned_translated_text`)
- Since I've set a daily character translation limit in the google translation API, it will throw an error after hitting the limit.  That's why the `try` - `except` in the `translate_tweet_text` function works. 
- There is also some code to handle things like URLs, which case problems with translation (especially when the text of the tweet needs to be broken up)
 - In an attempt to minimize overly-long tweets, it replaces full urls with a hyperlinked `link`, and also tags mentioned accounts so that you can click through to them
- The new tweet includes the username of the original tweeter. That can make it too long to fit into a single tweet.  The script will check the length of the new tweet and break it up into two tweets of necessary. It does this by trying to send the tweet and, if doing so throws an error, using `one_tweet_to_two_tweets` to turn it into two tweets. 

### Running

The script will loop every 2 minutes until it crashes.  Each loop it will provide an update on new accounts (usually `no new accounts in list`), how many times it has looped since the start (`loop_counter is now 39`), and how many tweets it has sent out since the start (`change_counter is now 3`). It uses `change_counter` for the last message because each time it sends a tweet it updates the `last_post_time` for that account.

I've found this to be relatively stable for the past few months. The biggest problem I have right now is that when it crashes it just stops tweeting. That means it usually takes me a few days to realize that it's gone.  

One other strange thing I've noticed is that other accounts are responding to some of the tweets (see [https://bsky.app/notifications](https://bsky.app/notifications)). I more or less assume that these are bots designed to search out any keywords, but I have no idea what's really going on there. 


* *All posts to text-based social media platforms are tweets. When Twitter became X, ‘tweet’ became a generic term. That’s my personal canon.*

*Feature image: [German mail coach model](https://www.si.edu/object/german-mail-coach-model:npm_0.052985.267) from the Smithsonian Open Access Collection.*
