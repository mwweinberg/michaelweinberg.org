---
layout: post
category: blog
title: The Good Actor/Bad Actor Approaches to Licensing
date: 2020-05-15
tags:
- opensourcehardware
- copyright
- glam
image:
     feature: good-bad.jpg

---

All things being equal, do you want to make it easy for good actors to be good or to be able to punish bad actors for being bad?

This post is about two different ways to approach licensing questions: focusing on good actors and focusing on bad actors.  Fundamentally, it is about how to weigh various tradeoffs inherent in making licensing decisions.  This choice is not intended to be a dichotomy. Instead, it is more like a framework for understanding the choices that need to be made.

Recently I have found this framework to be especially useful in two contexts.  The first is in situations where it is not entirely clear how the intellectual property rights you have map onto the thing you are nominally licensing. This can [often be the situation](https://michaelweinberg.org/post/150123246460/the-cost-of-a-successful-creative-commons-and-open) in open source hardware, where some aspects of the hardware are protected (or protectable) by an IP right, some aspects are not, and it may or may not be possible to engineer around the protected parts to recreate the underlying functionality.  In other words, the thing you have is protectable*ish* in ways that are not super clean.

The second is in situations where you are hoping to engage a large number of legally unsophisticated users.  This can often be the case in the [GLAM Open Access world](https://michaelweinberg.org/blog/2020/03/01/smithsonian-open-access/), where you are making works available to the public in the hopes that they will make use of them.  In these types of situations you want as many people as possible to make use of what you are releasing.  In doing so you need to assume that the vast majority of your users are casual, and very few of them will have access to lawyers that can help them navigate the specifics of the license terms.

I am not suggesting that there is anything revolutionary about this approach.  It has just been especially useful recently so it seemed worth writing down in case it is helpful to someone else.

## Good Actor/Bad Actor

The core concept of this framework is to optimize your licensing structure and presentation to target the actor you are most concerned about.  In this context ‘good actors’ are users following your rules and behaving in ways that you approve of.  ‘Bad actors’ are users breaking your rules and behaving in ways you disapprove of.  

Given the choice, which one of those is your priority?

### Good Actor Approach     

In order to support a good actor, you want to prioritize facilitating use and removing barriers. That means you want to use broadly permissive licenses that minimize the number of obligations and restrictions imposed on licensees.  You also want to avoid extensive legal language and disclaimers (even if they are substantively reasonable!) that can intimidate users and undermine confidence that they really are allowed to use the licensed works as you intend.

**Good Actor Pros**

* Makes it maximally easy for users to make use of whatever it is you are licensing
* Gives users confidence that you are inviting them to make use of whatever it is you are licensing, and that the terms are unlikely to change in the future
* Builds goodwill among user community

**Good Actor Cons**

* Likely prevents you from reserving every possible legal remedy to use against bad actors
* Allows bad actors to break some rules without facing direct legal consequences

### Bad Actor Approach

In order to maximize your ability to punish a bad actor, you want to provide legal language that defines the types of permitted behavior as specifically as possible.  Although there is not an inherent conflict between legal specificity and clean writing (see, for example, the [Blue Oak Model License](https://blueoakcouncil.org/license/1.0.0)), in many cases that specificity will come with additional legal language and restrictions.  Even the most user-friendly legal language can intimidate legally unsophisticated users, and each additional restriction can dissuade some (potentially good) users from making use of the thing.  

**Bad Actor Pros**

* Reserves as many legal tools as possible to punish users who break the rules
* Maximally shield you from legal liability

**Bad Actor Cons**

* Can inadvertently discourage welcomes uses that users (incorrectly) perceived as beyond the scope of the rules
* May create ongoing necessity to engage with lawyers to revise rules and enforce violations

Lawyers are often trained to be conservative pessimists.  As a result, we tend to undervalue the costs associated with adding one more clause to an agreement or one more disclaimer on a site.  It is also true that adding the additional clause or disclaimer can allow you to prevail in litigation.  

However, It is also true that many projects are not built on adversarial relationships with users.  In many cases there may be real benefits to a more minimal approach that outweigh the cost of leaving additional clauses out.  

None of this means that you should be legally irresponsible on how you approach your licensing. Instead, I have found thinking about empowering good actors and punishing bad actors as a useful way to help develop an approach that will help everyone achieve their goals while giving myself permission not to add that one more clause and disclaimer.  

Specifically, when I think about empowering good actors as a goal of a licensing regime, it gives me something to weigh against my impulse to add additional legal language.  Instead of being lazy, taking a more minimal approach is actually doing a better job of achieving the project’s goal.

*Feature Image: Excerpt from [The Temptation](https://www.si.edu/object/temptation:npg_AD_NPG.77.15) in the Smithsonian's Open Access Judge Magazine archive. I had to crop out many geographic features of silver. There's really nothing better than golden age political cartoons.*
