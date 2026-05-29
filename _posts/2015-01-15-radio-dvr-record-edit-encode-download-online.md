---
layout: post
title: Radio DVR (record, edit, encode, download online radio stream) with a remote
  server and a raspberry pi
date: '2015-01-15T11:32:33-05:00'
tags:
- projects
tumblr_permalink: post/108174148710/radio-dvr-record-edit-encode-download-online
---
<p>I like to listen to NPR when I work out but radio reception at my gym is horrible.  In order to resolve this problem I wanted to record NPR and download it onto my MP3 player.  Since I also travel a bit, I wanted to be able to access the recording on the road (I actually like finding local NPR stations, but sometimes I can&rsquo;t get good reception).</p>
<p>If all you want to do is record a radio stream, <a href="http://www.instructables.com/id/Schedule-Streaming-Audio-Recordings-in-Ubuntu/" target="_blank">this instructable</a> is amazing, helpful, and all you really need.  If you want to go a bit nuts and go well beyond what&rsquo;s necessary, here&rsquo;s a more elaborate option.</p>
<p><strong>Here are the steps I had in mind</strong>:</p>
<ul><li>Record audio automatically</li>
<li>Edit out parts of the recording as needed</li>
<li>Transcode edited WAV recording into MP3</li>
<li>Make MP3 available anywhere with an internet connection</li>
<li>Automatically load edited MP3 onto MP3 player</li>
</ul><p>Bonus challenge: I wanted to avoid making my (7+ year old) home laptop a core part of this setup because I didn&rsquo;t want to have to keep it on all the time.  At one point I was using a local ubuntu server I had running all of the time to do some of it, but it was a pretty underpowered via epia rig (good from an electricity standpoint, bad from a performance standpoint).  That made the MP3 conversion slow.  As a result, I moved the recording, transcoding, and editing to the cloud for $5/month.</p>
<p><strong>Outline of process</strong>:</p>
<ol><li>Initiate WAV recording on remote server</li>
<li>Stop WAV recording on remote server</li>
<li>Initiate WAV recording on remote server (I&rsquo;ll explain this below)</li>
<li>Stop WAV recording on the remote server</li>
<li>Combine the two WAV files created in steps 1 and 2, 3 and 4, respectively</li>
<li>Transcode the unified WAV file into a single MP3 file</li>
<li>Download the MP3 file from the remote server to a local MP3 player</li>
<li>Unmount the MP3 player</li>
</ol><p>To put it it bit more simply - create the file on the remote server and then move it onto the local MP3 player.</p>
<p><strong>What you will need (or at least what I used):</strong></p>
<ul><li>A cloud server running ubuntu (I used <a href="https://www.digitalocean.com" target="_blank">Digital Ocean</a> because they had great documentation to walk me through a process I didn&rsquo;t fully understand.  You could just do this with a local computer). $5/mo</li>
<li>A Raspberry Pi (although this is not necessary if you have a linux box that is always running - raspberry pi as the advantage of having a low enough energy requirement that I don&rsquo;t feel bad running it all the time). <a href="http://www.adafruit.com/products/1914" target="_blank">$40 </a></li>
<li>An MP3 player.  I use a <a href="http://www.amazon.com/SanDisk-Sansa-Clip-Player-Black/dp/B002MAPT7U/ref=sr_1_1?ie=UTF8&amp;qid=1421250881&amp;sr=8-1&amp;keywords=sansa+clip" target="_blank">sansa clip</a> for working out because it is small, relatively cheap, gets FM radio reception, and much more sweatproof than my phone.  But anything that mounts as an external drive will work here. $40.</li>
</ul><p><strong>Step 1: Prepare the remote server</strong></p>
<p>I&rsquo;ve been running a local ubuntu server for long enough that I almost kind of know what I was doing.  Fortunately, the Digital Ocean&rsquo;s documentation was fantastic and helped me though the complicated parts.</p>
<p>After setting up the cheapest ubuntu server available (this is an embarrassingly low impact use of a remote server) there were a few things that I made sure were working:</p>
<p>First, set up SSH keys for access.  This is more secure and allows my local computer to log in automatically.  Tutorial <a href="https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2" target="_blank">here</a>.  Life is slightly easier if you have generated the public keys for all of the local computers (including the PI) you want to use to access the remote server ahead of time (the server setup will let you automatically include them) but only just.  It isn&rsquo;t the end of the world if you do it after the server is set up.</p>
<p>Second, make sure your server automatically installs security updates.  The server is a computer and it needs updates just like any other computer, but I&rsquo;m not fooling myself into thinking that I will ever remember to do this.  Tutorial <a href="https://help.ubuntu.com/community/AutomaticSecurityUpdates" target="_blank">here</a>.</p>
<p>Third,  make sure lame, mplayer, and sox is installed on your server.</p>
<p><strong>Step 2: Create some scripts</strong></p>
<p>This section builds off of <a href="http://www.instructables.com/id/Schedule-Streaming-Audio-Recordings-in-Ubuntu/" target="_blank">this amazing instructable from before</a>.  As I mentioned above, I made this process a bit harder because I wanted to edit out about 10 minutes from the middle of the recording.  Why? Because it was a recurring segment that I didn&rsquo;t really like and its my recording so I can do whatever I want.</p>
<p>Instead of recording everything and finding a way to automatically edit out the part I didn&rsquo;t want, I decided it would be easier to record the first part, wait 10 minutes, and record the second part.  After that I pulled the two parts together and turned them from a (big) WAV file into a (small) mp3 file.  In order to do that, I needed to create 4 super small scripts.  (Note: there is probably a much more efficient way to do this).</p>
<p><em>streamrecord0 and streamrecord 1</em></p>
<p>These are identical programs, except for the fact that they name their output &ldquo;mystream0.wav&rdquo; and &ldquo;mystream1.wav&rdquo; respectively.  One is used to record the first chunk and one is used to record the second chunk.  The entirety of the scripts is below.  Just copy it into a text editor, save it, and make it executable (as described <a href="http://www.instructables.com/id/Schedule-Streaming-Audio-Recordings-in-Ubuntu/step3/Save-script-make-pkill-script-and-make-scripts-exe/" target="_blank">here</a>.)</p>
<blockquote>
<p>#!/bin/sh<br/>NOW=$(date +&ldquo;%b-%d-%y&rdquo;)<br/>mplayer &ldquo;http://wamu.org/streams/live/1/live.pls&rdquo; -ao pcm:file=/tmp/mystream0.wav -vc dummy -vo null ;</p>
</blockquote>
<p>and</p>
<blockquote>
<p>#!/bin/sh<br/>NOW=$(date +&ldquo;%b-%d-%y&rdquo;)<br/>mplayer &ldquo;http://wamu.org/streams/live/1/live.pls&rdquo; -ao pcm:file=/tmp/mystream0.wav -vc dummy -vo null ;</p>
</blockquote>
<p>There is no line break in the line that starts with &ldquo;mplayer.&quot;  Replace the URL with the URL of the stream you want to record (this can often be found by looking for a streaming option called &quot;MP3&rdquo; or &ldquo;PLS&rdquo; - here&rsquo;s <a href="http://wamu.org/listen" target="_blank">WAMU&rsquo;s page</a> as an example.  It WILL NOT just be the main website of the station).  /tmp/mystream0.wav is the name of the output file and can be changed to whatever you want (just make sure you change the other scripts accordingly, and that you name the outputs of the two files different things or the second one will just save over the first one).</p>
<p><em>pkill</em></p>
<p>This script stops the streamrecord script, thus &ldquo;finalizing&rdquo; the file. It probably doesn&rsquo;t even need to be a script.</p>
<blockquote>
<p>pkill mplayer</p>
</blockquote>
<p><em>soxer</em></p>
<p>This script takes the two recorded files, combines them, and turns them into a single mp3 file.</p>
<blockquote>
<p>#!/bin/sh<br/>pkill mplayer;<br/>sox /tmp/mystream0.wav /tmp/mystream1.wav /tmp/mystream2.wav;<br/>lame /tmp/mystream2.wav /home/mystreamB.mp3;</p>
</blockquote>
<p>The first line ends any recording that is happening.  The second line (the sox line) takes the two recordings (mystream0.wav and mystream1.wav) and turns them into a single recording  (mystream2.wav).  The third line (the lame line) takes the single recording (mystream2.wav) and turns it into an mp3 (mystreamB.mp3).  Change that final directory (just /home/ in the example above) to wherever you want the file to go.</p>
<p><strong>Step 3: Schedule some scripts</strong></p>
<p>Now you have some scripts, but they are just kind of hanging out.  They need to be scheduled to do us any good.  This is a job for cron.  Cron is a program that automatically runs scripts at scheduled intervals, which is exactly what you want to do.</p>
<p>Typing &ldquo;crontab -e&rdquo; in your command line will bring up the croneditor (there are also various programs that can guide you through the process).  My cron table looks like this:</p>
<blockquote>
<p>30 4 * * * /scripts/streamrecord0<br/>50 4 * * * /scripts/pkill<br/>00 5 * * * /scripts/streamrecord1<br/>30 6 * * * /scripts/soxer</p>
</blockquote>
<p>The first number is minutes, the second is hours, and the next 3 are day of month, month, and week.  Since I want these to run every day, the last 3 are just *, which means &ldquo;every time.&rdquo;</p>
<p>As you can see, streamrecord0 (which lives in the /scripts/ directory) starts at 4:30am.  At 4:50am pkill stops it.  At 5:00am streamrecord1 starts.  At 6:30am soxer stops streamrecord1, merges streamrecord0 and streamrecord1, and turns the output into an mp3 (because that&rsquo;s what is in the soxer script).  While everything else is pretty much instantaneous, transcoding almost two hours of WAV into mp3 takes about 3 minutes (which will vary by processor).  If you want to see how long your rig will take, just type &ldquo;lame [combined wav file] [location and name of output file]&rdquo; like you see in the soxer script into the command line and watch.</p>
<p>Congratulations!  Now you have the recording of your choice on a server far away.  It&rsquo;s time to bring it home.</p>
<p><strong>Step 4: Prepare your local computer (Raspberry Pi)</strong></p>
<p>I explained why I am using a raspberry pi for this above, but you can use pretty much any computer that will be on when you need it for this.  If you are using a raspberry pi, set it up.  I followed adafruit&rsquo;s guide, specifically steps <a href="https://learn.adafruit.com/adafruit-raspberry-pi-lesson-1-preparing-and-sd-card-for-your-raspberry-pi" target="_blank">1</a>, <a href="https://learn.adafruit.com/adafruits-raspberry-pi-lesson-2-first-time-configuration" target="_blank">2</a>, <a href="https://learn.adafruit.com/adafruits-raspberry-pi-lesson-3-network-setup" target="_blank">3</a>, <a href="https://learn.adafruit.com/adafruits-raspberry-pi-lesson-6-using-ssh" target="_blank">6</a>, and <a href="https://learn.adafruit.com/adafruit-raspberry-pi-lesson-7-remote-control-with-vnc" target="_blank">7</a> (although 7 just made my life a bit easier and isn&rsquo;t strictly required).  If you didn&rsquo;t when you set up the original server, you will also need to add the pi&rsquo;s public key (in ~/.ssh/id_rsa.pub) to the cloud server (in /root/.ssh/authorized_keys by default).</p>
<p><strong>Step 5: Create script on local computer</strong></p>
<p>This one is pretty easy.  Assuming you have ssh set up correctly, you can just pull the file off of the cloud server automatically.  I also added a line to my script that unmounts my mp3 player so I can just pull it off of the pi in the morning (this means that if I don&rsquo;t use the mp3 player that day, I need to detach and reattach it before I go to bed so it is actually mounted when the script runs).</p>
<p>Create this script the same way as the others (and don&rsquo;t forget to make it executable).  I called it &ldquo;pipull&rdquo; because it pulls the file for the pi.</p>
<blockquote>
<p>#!/bin/sh<br/><br/>scp USERNAME@IPAaddressOfRemoteServer:/recordings/mystreamB.mp3 /media/0123-4567/PODCASTS/mystreamB.mp3;<br/><br/>umount /media/0123-4567;</p>
</blockquote>
<p>in order for this to work for you, you need to replace &ldquo;USERNAME&rdquo; with your username for the remote server (hint: it is probably just &ldquo;root&rdquo;) and IPAaddressOfRemoteServer with, you know, the IP address of your remote server.  Also, if you changed the output  location of the mp3 you will need to change that part.</p>
<p>The /media/0123-4567/PODCASTS may be specific to your MP3 player as well.  Mine happens to mount at /media/0123-4567 and have a default directory of PODCASTS, but if yours does not you will need to make changes accordingly.</p>
<p>The scp part automatically transfers the mp3 from the server to your remote player (and overwrites any existing mp3 by the same name - like yesterday&rsquo;s).  The umount unmounts the player.  Note: my MP3 player doesn&rsquo;t recognize that the file is actually new and if I don&rsquo;t tell it to play it from the beginning the file will begin playing where I ended the previous day. This can be slightly disorienting.</p>
<p><strong>Step 6: Schedule your script</strong></p>
<p>Just as with the server, the final step is to schedule your script to happen every day.  My crontab looks like this:</p>
<blockquote>
<p>34 6 * * * home/pi/scripts/pipull</p>
</blockquote>
<p>Note that it runs at 6:34am.  That gives the remote server time to turn the WAV file into an MP3 before downloading.</p>

<p>And that&rsquo;s it!  One final note.  In order to make my mp3 player mount automatically (instead of having it pop up a dialogue box asking me if I wanted to mount it) on the pi, I opened the pi&rsquo;s file manager (via VNC ) and went to edit -&gt; preferences -&gt; volume management.  There I checked &ldquo;mount mountable volumes automatically&rdquo; and &ldquo;mount removable media automatically&rdquo; and unchecked &ldquo;show available options for removable media.&quot;  I don&rsquo;t know if all of  those are strictly necessary, but they got the job done.</p>
