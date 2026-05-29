---
layout: post
title: Programmable Big Red Button ("easy button")
date: '2013-10-06T15:12:00-04:00'
tags:
- projects
tumblr_permalink: post/63297711076/programmable-big-red-button-easy-button
---
<p><img alt="image" src="/images/2013-10-06-programmable-big-red-button-easy-button.html0.jpg"/></p>

<p></p>
<p>This one is pretty straightforward.  I wanted to make a big red button that would play a sound of my choosing when I pushed it.  I thought about trying to reprogram one of the Staples easy buttons or even trying to design my own custom board.  But both of those options turned out to be much more complicated than what I ended up with.</p>
<p><br/>Turns out you only really need 2 things:</p>
<p>1 Big Dome Pushbutton (I got the <a href="https://www.sparkfun.com/products/11960" target="_blank">economy one from Sparkfun</a>): $5.95</p>
<p>1 <a href="http://www.invitebyvoice.com/push-button-sound-module.html" target="_blank">Recordable Sound Module from Invite By Voice</a>: $6.99</p>
<p><br/>You will also need some sort of box.  While I have dreams of making a laser cut box for this thing, as you can see a Sparkfun box works pretty well for  now.</p>
<p><br/>The sound module is incredibly straightforward to use.  Basically you download a bit of software from their site, connect the dongle, and upload it to the module.  It can actually support quite a long sound clip (at highest quality about 100 seconds) which is totally overkill for my purposes.</p>
<p><br/>Once you have uploaded it, pressing the button will trigger the sound.  But the stock button is a tiny little thing.  That&rsquo;s where the big red button comes in.</p>
<p><br/>The button is just a big way to trigger the switch.  To introduce it into the sound module, just cut off the stock button and solder in the switch that comes with the button:</p>
<p><img alt="image" src="/images/2013-10-06-programmable-big-red-button-easy-button.html1.jpg"/></p>
<p>Note that you only have two wires but the switch has three terminals.  One of the wires attaches to the terminal at the bottom (labeled &ldquo;COM&rdquo;).  Choosing between the other two terminals defines the  nature of the circuit.  The top terminal would make the circuit default on and cause the button push to break the circuit.  The bottom terminal would make the circuit default off and cause the button push to connect the circuit.</p>
<p>Since we want the button to turn the circuit on, I used the bottom terminal. </p>
<p>Now connect the switch with the rest of the button.  At this point you are pretty much done - pressing the button should play the sound.  But just having a button isn&rsquo;t quite enough.  It really needs a place to live.  Enter the box.</p>
<p><br/>First I cut (actually drilled) a hole into the top and installed the button:</p>
<p><img alt="image" src="/images/2013-10-06-programmable-big-red-button-easy-button.html2.jpg"/></p>
<p>The cardboard muffled the sound a bit so I cut a second hole and attached the speaker to it:<img alt="image" src="/images/2013-10-06-programmable-big-red-button-easy-button.html3.jpg"/></p>
<p>Note that I also cut the speaker off from the control module itself.  The wires are still attached, but cutting the paper let me position the speaker a bit easier.</p>
<p><img alt="image" src="/images/2013-10-06-programmable-big-red-button-easy-button.html4.jpg"/></p>
<p>And that&rsquo;s really it.  It took me a long time to figure this out but once I found the sound module it was super easy.</p>

<p></p>
