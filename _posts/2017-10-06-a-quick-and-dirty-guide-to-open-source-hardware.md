---
layout: post
title: A Quick and Dirty Guide to Open Source Hardware Licensing*
date: '2017-10-06T20:10:45-04:00'
tags:
- OSHW
- oshwa
tumblr_permalink: post/166125363755/a-quick-and-dirty-guide-to-open-source-hardware
---
<p>One of the issues that continues to vex the open source
hardware community is licensing.  The
reason for this is simple: licensing in open source hardware is hard.  From an IP standpoint, open source software is
basically a single blob of stuff comprehensively covered by a single copyright.  That means you can pick a single copyright
license and be done.</p><p>Open source hardware isn’t that easy. It is actually a mix
of a bunch of different elements covered by a bunch of different types of
IP.  That means that you are probably
going to need to pick a few types of licenses for a few different parts of your
hardware.  OSHWA is working on building a
tool to make this easier to figure out, but in the meantime I wanted to throw
up a quick post setting up a bit of a framework.  This framework is largely based on the work
that Ryan Lawson and Adam Alperowicz did as students at the <a href="http://www.law.nyu.edu/academics/clinics/semester/technologylawandpolicy" target="_blank">NYU Technology Law
and Policy Clinic</a>, although all errors are entirely mine.</p><p>When you are thinking about licensing your hardware, there
are at least four parts that might be involved.
That doesn’t mean that every piece of hardware has all four, but at a
minimum you should take the time to cross it off the list if it is appropriate.</p><p><b>Hardware</b>.  These are the
physical elements of your hardware.  This
might be protected by a combination of nothing, copyright, and patent.  If it is nothing, you don’t need to worry
about a license. If it is copyright, you should be looking at <a href="https://creativecommons.org/licenses/" target="_blank">Creative Commons
licenses</a> (note that licenses with Non-Commercial restrictions are not
compatible with the <a href="https://www.oshwa.org/definition/" target="_blank">open source hardware definition</a>).  If it is patent, things get a bit more
complicated.  The good news is that you
don’t just back into a patent. If you hardware is protected by a patent it is
because you paid a lot of money to acquire that patent.  Talk to the lawyer who got you your patent
about licensing options.  Not sure what
to do?  If the <a href="http://michaelweinberg.org/post/161404432100/disclaim-and-request-a-way-forward-for-creative" target="_blank">CC disclaim and request</a>
option existed that would be best.  Until
then, unless your hardware includes a lot of artistic or decorative elements
you can probably skip this.</p><p><b>Documentation</b>.  This is
covered by copyright.  It is a required
part of the open source hardware definition.
Pick a Creative Commons license and apply it to the documentation.  That will let other people make copies of
your documentation.</p><p><b>Software</b>.  This is
also covered by copyright.  There are
many copyright licenses written precisely for software.  Pick an <a href="https://opensource.org/licenses" target="_blank">OSI-compliant license</a> and apply it to
your software.</p><p><b>Branding</b>.  The name of
your hardware can be protected by trademark.
If you have a trademark you probably do not want to causally license it,
because your trademark tells people “this version of X comes from me.”  Fortunately not licensing your trademark is
totally allowed under the open source hardware definition. In fact, not
offering blanket licenses on your trademark is part of what makes open source
hardware work because it allows other people to build on your hardware without suggesting that you are responsible for whatever they put out in the world.</p><p>And that’s it.  Quick
and dirty.  Wherever you are posting your
licensing and documentation, it might make sense to break out the various
licenses.  You know, something like this:</p><p>Documentation: <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons Attribution 4.0</a></p><p>Software: <a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a></p><p>(note the absence of a hardware license because this
imaginary piece of hardware does not have any protectable elements in the physical hardware. I also didn’t license the imaginary trademark that is connected to the imaginary hardware.)</p><p>Thoughts, questions, or corrections?  <a href="http://michaelweinberg.org/about" target="_blank">Hit me up</a>. 
Want more?  Keep an eye on <a href="https://www.oshwa.org/" target="_blank">OSHWA</a>,
where we are working to build out a much less dirty (but if appropriate to the
use just as quick) version in the coming months. </p><p><br/></p><p>*<i>This title is not a lie.
This guide is quick and it is dirty. That means that it doesn’t contemplate
every possible situation, so there are plenty of right ways to do open source
hardware licensing that are not listed.  That also means that it is full of gross generalizations that may not apply to you.  That also also means that it is not intended to substitute for legal
advice.  If you are thinking seriously
about this issue for your own hardware, it may be worth talking to a lawyer who
is your lawyer about how licensing impacts your hardware.</i></p>
