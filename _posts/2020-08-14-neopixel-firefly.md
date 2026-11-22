---
layout: post
category: blog
title: Simulating Firefly Flashes with CircuitPython and Neopixels
date: 2020-08-14
tags:
- projects
- opensourcehardware
- circuitpython
image:
     feature: firefly.jpg

---

_Update 10/11/20: I did figure out how to use classes to automatically scale this to n lights! Updated post is [here](/blog/2020/10/11/neopixel-firefly-classes/)._

This post is a walkthrough for having [neopixels](https://learn.adafruit.com/adafruit-neopixel-uberguide) (individually addressable LEDs) flash in firefly patterns.  The script uses [circuitpython](https://circuitpython.org/) and uses three flash patterns from a National Park Service [website](https://www.nps.gov/grsm/learn/nature/firefly-flash-patterns.htm).  It should be very easy to add additional patterns as you see fit.  The full script can be found [here](https://github.com/mwweinberg/firefly/blob/master/firefly.py).  

One quick note before getting started.  The current version of the script has 90% of the functionality I want it to have. I have a strong suspicion that the last 10% will require a full rewrite and more complex code. I'm putting up this post with simple code for anyone who wants to avoid the more complex version (if it ever ends up existing).

Here's the full code:

```python
#https://www.nps.gov/grsm/learn/nature/firefly-flash-patterns.htm

import board
import digitalio
import time
import neopixel
import random



#variables to hold the color that the LED will blink
neo_r = 255
neo_g = 255
neo_b = 0

# variable to hold the number of neopixels
number_of_lights = 7

#create the neopixel. auto_write=True avoids having to push changes (at the cost of speed, which probably doesn't matter here)
pixels = neopixel.NeoPixel(board.NEOPIXEL, number_of_lights, brightness = 0.2, auto_write=False)

# automatically spins up the seed reset times for each light
reset_time_dict = {}

# sets the seeds to zero
for i in range(0, number_of_lights):
    var_name = 'resetTime' + str(i)
    reset_time_dict[var_name] = time.monotonic()


print(reset_time_dict)

def on(light_num):
    pixels[light_num] = (neo_r, neo_g, neo_b)
    pixels.show()
def off(light_num):
    pixels[light_num] = (0, 0, 0)
    pixels.show()

def brimleyi(reset_time_input, light_number):
    #calculates how much time has passed since the new zero
    time_from_zero = time.monotonic() - reset_time_input
    # creates the carry over reset_time variable so that it can be returned even if it is not updated in the last if statement
    reset_time = reset_time_input

    # on flash
    if 5 <= time_from_zero <= 5.5:
        on(light_number)
    elif 15 <= time_from_zero <= 15.5:
        on(light_number)

    # reset (includes 10 seconds after second flash - 5 on the back end and 5 on the front end)
    elif time_from_zero > 20:
        off(light_number)
        reset_time = time.monotonic() + random.uniform(-3, 3)

    # all of the off times
    else:
        off(light_number)

    return reset_time

def macdermotti (reset_time_input, light_number):
    #calculates how much time has passed since the new zero
    time_from_zero = time.monotonic() - reset_time_input
    # creates the carry over reset_time variable so that it can be returned even if it is not updated in the last if statement
    reset_time = reset_time_input

    # on flash
    if 3 <= time_from_zero <= 3.5:
        on(light_number)
    elif 5 <= time_from_zero <= 5.5:
        on(light_number)
    elif 10 <= time_from_zero <= 10.5:
        on(light_number)
    elif 12 <= time_from_zero <= 12.5:
        on(light_number)

    elif time_from_zero > 14.5:
        off(light_number)
        reset_time = time.monotonic() + random.uniform(-3, 3)

    else:
        off(light_number)

    return reset_time

def carolinus(reset_time_input, light_number):
    time_from_zero = time.monotonic() - reset_time_input
    # creates the carry over reset_time variable so that it can be returned even if it is not updated in the last if statement
    reset_time = reset_time_input

    if 0 <= time_from_zero <= 0.5:
        on(light_number)
    elif 1 <= time_from_zero <= 1.5:
        on(light_number)
    elif 2 <= time_from_zero <= 2.5:
        on(light_number)
    elif 3 <= time_from_zero <= 3.5:
        on(light_number)
    elif 4 <= time_from_zero <= 4.5:
        on(light_number)
    elif 5 <= time_from_zero <= 5.5:
        on(light_number)
    elif 6 <= time_from_zero <= 6.5:
        on(light_number)

    elif time_from_zero >= 15:
        off(light_number)
        reset_time = time.monotonic()

    else:
        off(light_number)

    return reset_time


while True:

    reset_time_dict["resetTime2"] = brimleyi(reset_time_dict["resetTime2"], 2)
    reset_time_dict["resetTime3"] = brimleyi(reset_time_dict["resetTime3"], 3)
    reset_time_dict["resetTime4"] = macdermotti(reset_time_dict["resetTime4"], 4)
    reset_time_dict["resetTime5"] = carolinus(reset_time_dict["resetTime5"], 5)
    reset_time_dict["resetTime6"] = carolinus(reset_time_dict["resetTime6"], 6)





    #briefly pauses the loop to avoid crashing the USB bus. Also makes it easier to see what is happening.
    time.sleep(0.25)
```

At a high  level, it creates three functions (one for each type of firefly flash pattern) and then assigns that pattern to a light.  The patterns are based on timing, so it uses the `monotonic()` function to keep track of time.  There is not a real clock on microcontrollers, so `monotonic()` just counts up from the moment the board turns on.

```python
#https://www.nps.gov/grsm/learn/nature/firefly-flash-patterns.htm

import board
import digitalio
import time
import neopixel
import random
```

The first part of the code imports the libraries used by the script.

```python
#variables to hold the color that the LED will blink
neo_r = 255
neo_g = 255
neo_b = 0
```
The next part holds the color for the LED.   The current color is yellow, although you could make it whatever you want. This script uses the same color for all of the lights, regardless of their pattern.

```python
# variable to hold the number of neopixels
number_of_lights = 7
```

This variable holds the number of lights you are using.  It is moderately useful to have this as a variable now, and likely very useful when the script is fully functional and can automatically populate n lights.

```python
#create the neopixel. auto_write=True avoids having to push changes (at the cost of speed, which probably doesn't matter here)
pixels = neopixel.NeoPixel(board.NEOPIXEL, number_of_lights, brightness = 0.2, auto_write=False)
```
This line initializes the neopixels. I developed this on an Adafruit circuit playground board, so you may need to change this line depending on your setup.  The other thing to point out here is that the `brightness` variable is set to `0.2`. Neopixels are bright, so I toned things down during development. You might want to make them brighter for your final installation.   

```python
# automatically spins up the seed reset times for each light
reset_time_dict = {}
```
This creates a dictionary to hold the reset times for each light. Each light resets its timer at the end of a cycle, so you need a variable to hold the reset time for each individual light.

```python
# sets the seeds to zero
for i in range(0, number_of_lights):
    var_name = 'resetTime' + str(i)
    reset_time_dict[var_name] = time.monotonic()
```

This automatically sets the reset time for each light, by iterating based on the `number_of_lights` variable from above.  

```python
print(reset_time_dict)
```

This print line was just for troubleshooting. I should probably just delete it.

```python
def on(light_num):
    pixels[light_num] = (neo_r, neo_g, neo_b)
    pixels.show()
def off(light_num):
    pixels[light_num] = (0, 0, 0)
    pixels.show()
```

These two little functions define the neopixel being on and being off. Each pattern function needs to turn lights on and off, so it was easier to define that behavior once and reuse it as a function.

```python
def brimleyi(reset_time_input, light_number):
    #calculates how much time has passed since the new zero
    time_from_zero = time.monotonic() - reset_time_input
    # creates the carry over reset_time variable so that it can be returned even if it is not updated in the last if statement
    reset_time = reset_time_input

    # on flash
    if 5 <= time_from_zero <= 5.5:
        on(light_number)
    elif 15 <= time_from_zero <= 15.5:
        on(light_number)

    # reset (includes 10 seconds after second flash - 5 on the back end and 5 on the front end)
    elif time_from_zero > 20:
        off(light_number)
        reset_time = time.monotonic() + random.uniform(-3, 3)

    # all of the off times
    else:
        off(light_number)

    return reset_time
```

This is the first blinking function.  It takes two arguments. The `reset_time_input` is the counter start time.  The `light_number` is which neopixel it is controlling.

Without a real clock, all of the flash functions are controlled by a counter.  You can think of the counter starting at 0 for the first loop (it doesn't actually start a 0 the first time, but ignore that for a minute).

`time_from_zero = time.monotonic() - reset_time_input` figures out how long it has been since the start of the counter.  In the example first loop, the `reset_time_input` would be 0.  If it has been 2 seconds since the counter started counting, the `time_from_zero` would equal 2.  

That value is then compared to a bunch of `if` statements that determine if the light is on or off.  In this first function, the light goes on if the `time_from_zero` is between 5 and 5.5 seconds, and between 15 and 15.5 seconds.  Because the default state of things is that the light is off, we only need `if` triggers for when the light needs to be on.

Once the `time_from_zero` exceeds 20 seconds, the counter resets.  That reset is based on the current time (`time.monotonic()`) with a bit of random variation (`random.uniform(-3, 3)`) so that the different lights are not all in sync (the `carolinus()` function does not include this random variation because the carolinus bugs flash in unison).

As soon as the cycle is complete, it returns a new `reset_time`.  Remember that there is only one counter on the board, and it just keeps counting up.  The first time through the cycle, `reset_time_input` might be 0. The second time through, the cycle 'starts' closer to 20.  Similarly, instead of being 2 the first time around, the `time.monotonic()` will be 22 the second time around.  The `time_from_zero` function normalizes all of this, because 2-0, 22-20, and 82-80 are all the same value.  That allows the function to keep working over time.

The `macdermotti()` and `carolinus()` functions work the same way. If you want to make a new function for a new pattern, just duplicate it, rename it, and change the if statements.

```python
while True:

    reset_time_dict["resetTime2"] = brimleyi(reset_time_dict["resetTime2"], 2)
    reset_time_dict["resetTime3"] = brimleyi(reset_time_dict["resetTime3"], 3)
    reset_time_dict["resetTime4"] = macdermotti(reset_time_dict["resetTime4"], 4)
    reset_time_dict["resetTime5"] = carolinus(reset_time_dict["resetTime5"], 5)
    reset_time_dict["resetTime6"] = carolinus(reset_time_dict["resetTime6"], 6)
```

Now that all of the functions work, this `while` loop will just keep running them forever.

`reset_time_dict["resetTime2"]` starts with the reset time for light #2 that we automatically generated at the top of the script.  `brimleyi(reset_time_dict["resetTime2"], 2)` calls the `brimleyi()` function, using that reset time.  Because the end of the functions all return their 'new' reset time (even if it was not updated that cycle), the reset time in the dictionary will always be the one you want to work with.

```python
#briefly pauses the loop to avoid crashing the USB bus. Also makes it easier to see what is happening.
    time.sleep(0.25)
```

This last line just rests for 0.25 seconds.  Before I added it, the looping was flooding the USB bus and creating all sorts of problems.  Briefly pausing everything just makes it easier to work with.  

---

At the top of this post I mentioned that the script did 90% of what I want it to do. The remaining 10% has to do with everything in the while loop.  

You might have noticed that the reset times are automatically generated for each light at the start of the loop. However, you need to manually create an entry for every light in the while loop.  

Ideally, this script would automatically create the entries for the lights in the while loop and randomly assign them a flash pattern. Unfortunately, I think doing so will probably require turning the pattern functions into classes. Or at least that's what the Coding Train's [Nature of Code](https://www.youtube.com/watch?v=70MQ-FugwbI) series has me thinking about these days.

Classes or no classes, I still haven't figure out how to fully automate things yet. Once I do, I'll post some updated code.  Until then, hopefully this is useful to someone else.

*header image: [Case (Inrō) with Design of Fireflies in Flight and Climbing on Stone Baskets and Reeds at the Shore](https://www.metmuseum.org/art/collection/search/58837)*
