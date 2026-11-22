---
layout: post
category: blog
title: Announcing the Open Source Hardware Certification API
date: 2020-10-24 01:01:01
tags:
- opensourcehardware
- oshwa
image:
     feature:

---
*This post [originally appeared](https://www.oshwa.org/2020/10/21/announcing-the-open-source-hardware-certification-api/) on the OSHWA blog*

Today we are excited to announce the launch of a read/write API for our [Open Source Hardware Certification](https://certification.oshwa.org/) program. This API will make it easier to apply for certification directly from where you already document your hardware, as well as empower research, visualizations, and explorations of [currently certified hardware](https://certification.oshwa.org/list.html).

OSHWA’s Open Source Hardware Certification program has long been an easy way for creators and users alike to identify hardware that complies with the [community definition of open source hardware](https://www.oshwa.org/definition/).  Since its creation in 2016, this free program has certified hardware from over 45 countries on every continent except Antarctica.  Whenever you see the certification logo on hardware:

![OSHWA certification logo](/images/oshwacertlogo.jpg)

You know that it complies with the definition and that the documentation can be found using its unique identifier (UID).

## What’s New?

The new API supports both read and write access to the certification process.  

**Write** access means that you can submit certification applications directly instead of using the [application form](https://application.oshwa.org/apply).  If you already have all of the application information in a system, there is no need to retype them into a webform.

We hope that this will make it easier for entities that certify large amounts of hardware to build the certification process directly into their standard workflow.  We are also working with popular platforms to integrate a ‘certify’ button directly into their systems.  

**Read** access gives you access to information about [hardware that has already been certified](https://certification.oshwa.org/list.html).  This will make it easier to explore the data for research, create compelling visualizations of certified hardware, and build customized lenses to understand what is happening in open source hardware.  

## What Happens Now?

The first thing you can do is [start exploring the API itself]().  The team at [Objectively](https://objectively.is/) has created detailed documentation, code snippets, and sandboxes that make it easy to test out all of the features.  

In the longer term, we hope that the community will build better ways to both submit applications for certification and present information about certified hardware.  OSHWA expects to maintain our application form and certification list for the foreseeable future.  That being said, we are also happy to share (and possibly cede) the stage to better ways to get information into and out of the system as they come along.  

For now, let us know what you do with the API!  You can tweet to us [@OHSummit](https://twitter.com/ohsummit) or send us an email at certification@oshwa.org.
