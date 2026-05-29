---
layout: post
title: Capacitive lightswitch (touch a picture, turn on a light) (updated 1/15)
date: '2014-03-16T19:05:00-04:00'
tags:
- projects
tumblr_permalink: post/79810686960/capacitive-lightswitch-touch-a-picture-turn-on-a
---
<p><img alt="image" src="/images/2014-03-16-capacitive-lightswitch-touch-a-picture-turn-on-a.html0.jpg"/></p>
<p>This is my first &ldquo;real&rdquo; (non-blink an LED) arduino project.  The problem: our bar blocks the lightswitch for the light over the living room table.  The solution: control the light by touching a picture around the corner.  Touch the picture once to turn the light on and touch it again to turn the light off.</p>
<p>Supplies:</p>
<p>1 Arduino (I used Adafruit&rsquo;s <a href="https://www.adafruit.com/products/1315" target="_blank">Adruino Micro without headers</a>): $22.95</p>
<p><a href="https://www.sparkfun.com/products/10994" target="_blank">Bare Conductive electric paint</a>: $24.95</p>
<p>1 330k resistor</p>
<p>1 <a href="https://www.adafruit.com/products/501" target="_blank">usb power supply</a>: $5.95</p>
<p>1 <a href="https://www.adafruit.com/products/592" target="_blank">usb cable (A to micro B)</a>: $3.95</p>
<p>1 arduino-controllable relay (I used the Sparkfun <a href="https://www.sparkfun.com/products/11042" target="_blank">Beefcake Relay Control Kit</a>): $7.95</p>
<p>1 <a href="https://www.sparkfun.com/products/12070" target="_blank">solderable breadboard</a>: $4.95</p>
<p>1 washer (optional)</p>
<p>1 magnet (optional)</p>
<p><a href="http://playground.arduino.cc/Main/CapacitiveSensor?from=Main.CapSense#.UyYr6ZjfE6I" target="_blank">arduino capsense library</a></p>

<p>This thing ended up working in a fairly strightforward manner.  The picture itself is a capacitor and touching it changes its electrical resistance.  The arduino is monitoring the picture and when the resistance changes in a way that it is looking for, the arduino triggers the relay.  That relay is attached to the light so on is on and off is off.  The hardest part is setting the trigger threshold.</p>
<p>Here is a crappy and probably incorrect sketch of the circuit:</p>
<p><img alt="image" src="/images/2014-03-16-capacitive-lightswitch-touch-a-picture-turn-on-a.html1.jpg"/></p>

<p>B is the breadboard, A is the arduino, and R is the relay.  That word in the upper left is &ldquo;sensor&rdquo; because that wire goes towards the picture.  The dotted line on the breadboard shows that those two points are connected, and the zig zag line is the resistor.</p>
<p>(Edit 1/15: here&rsquo;s a better picture using fritzing)</p>
<p><img alt="image" src="/images/2014-03-16-capacitive-lightswitch-touch-a-picture-turn-on-a.html2.jpg"/></p>

<p>The first step is probably to paint your picture with the paint.  As far as I know the picture can pretty much be whatever you want. The only thing to be aware of is how you are going to connect it to the arduino.  The bare conductive tutorial that existed when I started this project (but that is now gone) suggested using the paint to &ldquo;glue&rdquo; a magnet to the wall.  I did that</p>
<p><img alt="image" src="/images/2014-03-16-capacitive-lightswitch-touch-a-picture-turn-on-a.html3.jpg"/></p>

<p>There is no reason that the connection point is far away from the main picture.  The wire is purely aesthetic - it keeps everything behind the bar and around the corner.  Once you have the magnet on the wall you can connect it to the arduino by soldering a washer to the end of a wire.</p>
<p>The next step is to build the circuit.  The circuit is made up of three elements: the arduino, the relay, and the breadboard.</p>
<p>The breadboard is not very complicated.  In fact, I probably could have just soldered all of the parts together to let them dangle in space.  But breadboards are cheap and I wanted this to look somewhat clean, so I decided to go for it.  Since this is a small circuit, I just cut the breadboard into smaller pieces.</p>

<p><img alt="image" src="/images/2014-03-16-capacitive-lightswitch-touch-a-picture-turn-on-a.html4.jpg"/></p>
<p>I then connected the wires and the resistor. Remember that everything in the same number row is connected electrically.</p>
<p><img alt="image" src="/images/2014-03-16-capacitive-lightswitch-touch-a-picture-turn-on-a.html5.jpg"/></p>
<p><strike>I used a 330K resistor.  The advantage of a 330K resistor (compared to, say, a 10K resistor) is that it increases the spread between the value returned by the picture when no one is touching it and when someone is touching it</strike>. (Edit 1/15: after having some problems with this - mostly the lights flashing on and of and/or the switch not responding to a touch - I went back and reread the <a href="http://playground.arduino.cc/Main/CapacitiveSensor?from=Main.CapSense" target="_blank">capacitive sensor arduino library documentation</a>.  I was using a resistor that was way to small.  The documentation recommends at least 1 megaohm for touch and larger ones for proximity.  Hopefully changing this will address some of my problems). This spread becomes important when you are setting the threshold.  We&rsquo;ll get to that in due time.</p>
<p>Once the breadboard is done it is time to connect it to the arduino.  I got a headerless arduino because I wanted to be able to solder the connections and I got the micro arduino because I wanted the final assembly to be as small as possible.  Connect the wires to the proper pins (2 and 4 if you are using my sketch).</p>
<p><img alt="image" src="/images/2014-03-16-capacitive-lightswitch-touch-a-picture-turn-on-a.html6.jpg"/></p>
<p>Next you need to connect the arduino to a relay. But what is a relay and why do you need it?  In a perfect/easy world, you could just use the ardino to power the light.  Activating a pin would send enough electricity towards the light to turn it on. In our imperfect/hard world, arduinos work at fairly low voltage while overhead lighting works at a fairly high voltage (the upside of this is that it is hard to kill yourself with the power coming out of the arduino).  A relay is essentially a high-voltage-controlling switch that is controlled by a low-voltage trigger.  When the relay gets the signal from the arduino it activates the high power switch controlling the lights. While these two switches are connected insomuch as the low voltage can control the high voltage, they are separate so the high voltage does not destroy the arduino.</p>
<p>You need to connect three wires from the arduino to the relay: 5v, ground, and control  The 5V and ground map directly from the arduino pins to the relay port.  The control pin is pin 13, which also controls the onboard LED.  The default state for the relay is off so when the on board LED is off (and pin 13 is off) the relay will be open and when the on board LED is on (and pin 13 is live) the relay will be closed.</p>
<p><img alt="image" src="/images/2014-03-16-capacitive-lightswitch-touch-a-picture-turn-on-a.html7.jpg"/></p>
<p>The next wire to connect is the one that goes from the breadboard to the picture (in the upper left).  Solder it inline with the wire connected to the 2 pin.</p>
<p><img alt="image" src="/images/2014-03-16-capacitive-lightswitch-touch-a-picture-turn-on-a.html8.jpg"/></p>
<p>You can now install the circuit.  I decided to replace the lightswitch with the relay.  The good thing about this was that it put the relay close to the power controlling the light.  The bad thing was that it exposed the relay connections to the ground that remained in the lightswitch port in the wall.  In order to prevent accidental shorts I wrapped the relay in rubber bands and electrical tape.  You can also see that the main wire is screwed into the relay (don&rsquo;t forget to turn off power going to the light while you do this!).</p>
<p><img alt="image" src="/images/2014-03-16-capacitive-lightswitch-touch-a-picture-turn-on-a.html9.jpg"/></p>

<p>Now connect the arduino to power with the USB cable and power supply. </p>
<p><img alt="image" src="/images/2014-03-16-capacitive-lightswitch-touch-a-picture-turn-on-a.html10.jpg"/></p>
<p>With that done it is time to program the arduino.  Make sure you have the <a href="http://playground.arduino.cc/Main/CapacitiveSensor?from=Main.CapSense#.UyYr6ZjfE6I" target="_blank">capsense library</a> installed.</p>
<p>Here is the sketch I used:</p>
<blockquote>
<p>//make sure to install the CapSense Library then upload to your Arduino.<br/>//for more information on the basic workings of this sketch check out <a href="http://bareconductive.com/capacitance-sensor" target="_blank">http://bareconductive.com/capacitance-sensor</a><br/><br/><br/>#include &lt;CapacitiveSensor.h&gt;<br/>#define MAINSpin 13<br/>const int threshold = 2000; //This is the threshold that you should adjust after watching the serial port. The MAINSpin is only set high if &ldquo;total 1&rdquo; is greater than this number  <br/> // currently set for a 330K resistor plugged into the wall outlet<br/>// find the lowest possible number that won&rsquo;t get triggered by random environmental factors<br/>// if the light is on all the time the value is too low<br/> // if the light tends to flash on and off it is close, but still too low<br/>int val = 0;<br/>int old_val = 0;<br/>int state = 0;<br/>int Touch = 0;<br/><br/>CapacitiveSensor   cs_4_2 = CapacitiveSensor(4,2);        // Your resistor goes between pins 4 &amp; 2. Your pad of paint should be connected to pin 2<br/> void setup()                    <br/>{ <br/><br/>pinMode(MAINSpin, OUTPUT);<br/>digitalWrite(MAINSpin, LOW);  <br/>cs_4_2.set_CS_AutocaL_Millis(</p>
<div>0xFFFFFFFF);     <br/>Serial.begin(9600);<br/>}<br/>void loop()                    <br/> {      <br/>val = Touch;                     <br/>long total1 =  cs_4_2.capacitiveSensor(100);  <br/><br/>Serial.println(total1);                  <br/>Serial.println(&ldquo; &rdquo;);                       <br/>       <br/><br/>if (total1 &gt; threshold){      <br/> Touch = 1;    <br/>} else {      <br/>Touch = 0;    <br/>}      <br/><br/>if ((val == HIGH)&amp;&amp; (old_val==LOW)){   <br/>state = 1-state;      <br/><br/>delay (50); //delay for debouncing  <br/>}    <br/><br/>old_val = val;     <br/><br/>if (state == 1) {    <br/>digitalWrite(MAINSpin, HIGH); //turn LED ON  <br/>} else {    <br/>digitalWrite(MAINSpin, LOW);  <br/>} <br/>  }</div>
</blockquote>
<div></div>
<div>The real action here is on the &ldquo;const int threshold&rdquo; line.  That is where you set the threshold to trigger activating or deactivating the relay.  In order to identify the right number, connect your arduino to your computer and turn on the serial monitor (tools -&gt; serial monitor).  The serial monitor will start spewing numbers at you.  If it is working, those numbers will be relatively low when you are not touching the picture (mine tended to be around 400) but relatively high when you are touching the picture (mine tended to be around 4000).  The kind of resistor you use on the breadboard will definitely influence these numbers, especially the difference between them.  It is possible that the size of your picture will also influence it.</div>
<div></div>
<div>As noted in the sketch, you want to find a number that is high enough not to be triggered by random events.  If you find the light quickly flashing on and off your number is too low - essentially the random variation in the sensed number is jumping just above and below the threshold.  If you set the number too high you won&rsquo;t be able to trigger the light.</div>
<div></div>
<div></div>
<div>In theory, once you get the number right you can upload the sketch to the arduino and go on your merry way.  Unfortunately I found that the proper threshold differed slightly depending on if the arduino was plugged into a laptop or the wall.  So don&rsquo;t be surprised if you need to adjust the numbers again once you start plugging it into the wall.</div>
<div></div>
<div></div>
<div>The good news is that once you have the number you are done.  Touching the picture once should turn on the light and touching it again should turn it off.  It may take a bit of practice to get the touching just right (a higher number will be less sensitive and a bit more forgiving).</div>
<div></div>
<div></div>
<div>Enjoy.</div>

<p></p>

<p></p>

<p></p>
