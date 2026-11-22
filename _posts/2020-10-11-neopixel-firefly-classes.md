---
layout: post
category: blog
title: Simulating Firefly Flashes with CircuitPython and Neopixels (Now with Classes!)
date: 2020-10-11
tags:
- projects
- opensourcehardware
- circuitpython
image:
     feature: firefly.jpg

---
_This is an updated version of an earlier post.  The earlier post did not use classes. Here is the [link to that post](/blog/2020/08/14/neopixel-firefly/) in case a slightly less functional non-class version is helpful._

This post is a walkthrough for having [neopixels](https://learn.adafruit.com/adafruit-neopixel-uberguide) (individually addressable LEDs) flash in firefly patterns.  The script uses [circuitpython](https://circuitpython.org/) and uses three flash patterns from a National Park Service [website](https://www.nps.gov/grsm/learn/nature/firefly-flash-patterns.htm).  It should be very easy to add additional patterns as you see fit.  The full script can be found [here](https://github.com/mwweinberg/firefly/blob/master/firefly.py).  

The current version of the script can easily accommodate an arbitrary number of lights, randomly assigning a firefly type to each one.

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
number_of_lights = 10

#create the neopixel. auto_write=True avoids having to push changes (at the cost of speed, which probably doesn't matter here)
pixels = neopixel.NeoPixel(board.NEOPIXEL, number_of_lights, brightness = 0.1, auto_write=False)

# sets up the bug holder list, which holds all of the bug objects

bug_holder = []


# sets up the bug class

class Bug:
    def __init__(self, type, reset_time_input, light_number):
        self.type = type
        self.reset_time_input = reset_time_input
        self.light_number = light_number


#functions to turn light on and off
def on(light_num):
    pixels[light_num] = (neo_r, neo_g, neo_b)
    pixels.show()
def off(light_num):
    pixels[light_num] = (0, 0, 0)
    pixels.show()


#functions for the types of fireflies
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


#create all of the light objects by appending a new light object to the list for each neopixel
#the first argument (random.randint(1, 3)) is used to assign a random number which corresponds to one of the ff functions
#if you start adding lots of those it might be worth using a universal variable

for i in range (0, number_of_lights):
    bug_holder.append(Bug(random.randint(1, 3), time.monotonic(), i))


while True:

    #iterates through all of the light objects in the bug_holder list
    #use the series of if statements to match the randomly assigned number to the types of fireflies

    for i in range (0, number_of_lights):
        if bug_holder[i].type == 1:
            bug_holder[i].reset_time_input = brimleyi(bug_holder[i].reset_time_input, i)
        elif bug_holder[i].type == 2:
            bug_holder[i].reset_time_input = macdermotti(bug_holder[i].reset_time_input, i)
        elif bug_holder[i].type == 3:
            bug_holder[i].reset_time_input = carolinus(bug_holder[i].reset_time_input, i)
        #this is just a catchall if there is some sort of error
        else:
            bug_holder[i].reset_time_input = brimleyi(bug_holder[i].reset_time_input, i)
            print("number error")


    #briefly pauses the loop to avoid crashing the USB bus. Also makes it easier to see what is happening.
    time.sleep(0.25)
```

At a high level, it creates a `Bug` class for each light, three functions (one for each type of firefly flash pattern) and then assigns that pattern to a light.  The patterns are based on timing, so it uses the `monotonic()` function to keep track of time.  There is not a real clock on microcontrollers, so `monotonic()` just counts up from the moment the board turns on.

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
number_of_lights = 10
```

This variable holds the number of lights you are using.  This makes it easy to change the number of lights you are controlling.

```python
#create the neopixel. auto_write=True avoids having to push changes (at the cost of speed, which probably doesn't matter here)
pixels = neopixel.NeoPixel(board.NEOPIXEL, number_of_lights, brightness = 0.2, auto_write=False)
```
This line initializes the neopixels. I developed this on an Adafruit circuit playground board, so you may need to change this line depending on your setup.  The other thing to point out here is that the `brightness` variable is set to `0.2`. Neopixels are bright, so I toned things down during development. You might want to make them brighter for your final installation.   

```python
# sets up the bug holder list, which holds all of the bug objects

bug_holder = []
```
This creates the list to hold each individual instance of the bug light object. Holding them in a list makes it easy to address them as necessary.

```python
# sets up the bug class

class Bug:
    def __init__(self, type, reset_time_input, light_number):
        self.type = type
        self.reset_time_input = reset_time_input
        self.light_number = light_number
```

This creates the `Bug` class.  Each individual neopixel is an instantiation of a 'Bug'.  It has a `type`, which corresponds to the flash pattern it uses, a `reset_time_input` to keep track of time, and a `light_number` to assign it to a specific light. It is possible that the `light_number` is redundant because it also corresponds to its order in the list, but I'm still in baby step territory so I didn't want to push it.   

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
#create all of the light objects by appending a new light object to the list for each neopixel
#the first argument (random.randint(1, 3)) is used to assign a random number which corresponds to one of the ff functions
#if you start adding lots of those it might be worth using a universal variable

for i in range (0, number_of_lights):
    bug_holder.append(Bug(random.randint(1, 3), time.monotonic(), i))
```
Having done all of the setup work, this is where things start to actually happen.  This loop creates as many `Bug` instances as necessary to match the number of lights you want to control.  The first argument `random.randint(1, 3)` assigns an integer that corresponds to one of the three blink functions.  The second argument `time.monotonic()` is the start time based on the board's counter.  The last argument `i` assigns the instance to a specific light.

```python
while True:

    #iterates through all of the light objects in the bug_holder list
    #use the series of if statements to match the randomly assigned number to the types of fireflies

    for i in range (0, number_of_lights):
        if bug_holder[i].type == 1:
            bug_holder[i].reset_time_input = brimleyi(bug_holder[i].reset_time_input, i)
        elif bug_holder[i].type == 2:
            bug_holder[i].reset_time_input = macdermotti(bug_holder[i].reset_time_input, i)
        elif bug_holder[i].type == 3:
            bug_holder[i].reset_time_input = carolinus(bug_holder[i].reset_time_input, i)
        #this is just a catchall if there is some sort of error
        else:
            bug_holder[i].reset_time_input = brimleyi(bug_holder[i].reset_time_input, i)
            print("number error")
```

This is the loop that constantly checks each light to see if it should be on or off based on the pattern assigned to it.  As it loops through each of the lights:

```python
  for i in range (0, number_of_lights):
```

it looks to see which `type` of light it is.  It then uses the type to decide which pattern function to use.  The end of each function returns their 'new' reset time even if their state did not change, so these sections end by updating the reset time.

Now that all of the functions work, this `while` loop will just keep running them forever.

```python
#briefly pauses the loop to avoid crashing the USB bus. Also makes it easier to see what is happening.
    time.sleep(0.25)
```

This last line just rests for 0.25 seconds.  Before I added it, the looping was flooding the USB bus and creating all sorts of problems.  Briefly pausing everything just makes it easier to work with.  


*header image: [Case (Inrō) with Design of Fireflies in Flight and Climbing on Stone Baskets and Reeds at the Shore](https://www.metmuseum.org/art/collection/search/58837)*
