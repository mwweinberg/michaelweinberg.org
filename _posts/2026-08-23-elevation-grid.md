---
layout: post
category: blog
title: Elevation Grid
date: 2026-08-23
tags:
- projects
- python
image:
     feature: grid.jpg

---
This is a simple project to visualize the surface of the earth with a LED matrix.  It is a way to play with open topographical data.

The concept is pretty straightforward.  Imagine a rectangle slowly sliding over the surface of the earth.  The topology of what is in the rectangle is displayed on a 32x16 LED matrix.

![image of a grid of LEDs showing different colors based on the elevation represented](/images/grid.jpg)

I used [this matrix](https://www.adafruit.com/product/420) driven by [this hat](https://www.adafruit.com/product/2345).  It is currently running on a pi 3 that I had lying around, but basically any pi will do.  The data is all local so it does not need to be connected to the internet to work.

However, connecting it to a local network gives you the ability to access the web page displaying the current position:

![screenshot of website showing the elevation as displayed on the grid and an image of the earth with a box indicating that location](/images/website_preview.png)

The full repo is available here: [https://github.com/mwweinberg/elevation_grid](https://github.com/mwweinberg/elevation_grid).

