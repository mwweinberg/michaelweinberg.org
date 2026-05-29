---
layout: post
title: The Missing Half of Open Source Hardware Licenses
date: '2016-06-02T07:26:18-04:00'
tags:
- opensourcehardware
tumblr_permalink: post/145301850875/the-missing-half-of-open-source-hardware-licenses
---
<p>Open source hardware
traces its roots directly back to the open source software community.
 Despite these roots, hardware is very different from software.  As a
result, while some of the norms of open source software port easily
to the world of hardware, some are an imperfect fit.  One of the
areas of imperfect analogy is in the world of licensing. 
Fundamentally, this is because open source hardware is not as
completely wrapped up in copyright as is open source software.  As a
result, open source hardware licenses generally lack one of the two
major features of open source software licenses.</p><p><b>Software Licenses</b><br/></p><p>Software is, as a
category of work, eligible for automatic copyright protection the
moment it is written.  As a result, software can be thought of as
“born closed.”  By default, in most cases using (which requires copying)
someone else’s software without permission violates their
copyright.  In order to change this default state, creators of
software use licenses to allow other to use their software without
risk of a copyright infringement lawsuit.  Fundamentally, these
licenses can be thought of as binding promises not to sue a user for
copyright infringement as long as the user complies with the terms of
the license.<br/></p><p>These license serve
at least two purposes.  For <b>users</b>, licenses clear the threat
of a copyright infringement lawsuit by laying out clear rules of use.
 Users can be confident that as long as they follow the rules of the
license, they cannot be sued for copyright infringement by the
original author of the software.<br/></p><p>For <b>creators</b>,
licenses let the software out in the world while still allowing the
creator to exercise some control over the software via license
conditions.  The creator gives up some control over the software, but
can be confident that future users are required to comply with
whatever limitations incorporated into the license (be it sharing
future work, buying the creator a beer, or whatever).  <br/></p><p>The single license
achieves both of these purposes: assuring users that they will be
free of infringement liability, and assuring creators that future
users will have to comply with restrictions that the creator cares
about (this can also be thought of requiring future users to ‘follow
the rules’).<b><br/></b></p><p><b>Hardware
Licenses</b></p><p>Unlike software,
hardware is not completely protected by copyright. While some parts
of hardware are eligible for copyright protection, many functional
elements simply are not.  While they may be eligible for patent
protection, since (unlike copyright protection) patent protection is
neither free nor automatic, generally speaking many parts of hardware
will be unprotected by any type of intellectual property.  This is
especially true for open source hardware, where the creators are
unlikely to elect to spend time and money obtaining patents on
their goods.</p><p>In many ways this is
a positive thing.  Unlike software, hardware is largely “born free”
and does not require a license to make it available to the larger
world.  This is the reason that you can legally hack hardware you own
in a what that does not really have a parallel in the world of
copyright.  However, this very freedom complicates open source
hardware licenses because it makes them harder to enforce.</p><p>That does not make
open source hardware licenses without value.  They can still
accomplish the first purpose of open source software licenses, which
is to relieve end users of anxiety related to IP violations that
might occur with use.  To the extent that the hardware is protected
by some sort of intellectual property rights (and many piece of
hardware have at least some protected component that this would be
relevant for)*, the license can give users confidence that using the
hardware within the limits of the license will prevent them from
being sued for infringement.</p><p>However, most open
source hardware licenses are less good at achieving the second
purpose.  As noted above, while many parts of any given piece of open
source hardware may be protected by copyright, many parts will not.
That is especially true for functional parts of the hardware.  Since
these parts are not protected by IP, using them does not require
permission from a rightsholder (because that rightsholder does not
exist because there are no rights to hold).  As a result, there is no penalty for violating the terms of
the license that purports to limit the use of these parts.</p><p>The outcome of this
is that in many cases end users will be able to violate the
restrictions that a creator places on a piece of open source hardware
without fear of an infringement lawsuit.  In these instances, the
open source hardware license has failed in that second purpose
outlined above because they do not allow creators to control the behavior of downstream users.</p><p><b>Can This be Fixed?</b></p><p>To give a lawyerly
answer, that depends on your definition of “fixed” is.  One way to
fix this problem would be to make it easier to get some sort of IP
protection on hardware.  That would make it more likely that
licensees would be able to enforce the terms of their licenses. 
However, because the law works for everyone not just people doing
open source hardware, any expansion of IP protection on hardware
would also be used by people who don’t care about openness to make
hardware more closed.  As I’ve written a number of times, it would
be tragic if the legacy of open source hardware was to make hardware
more closed.</p><p>
The other way
to fix this problem is with education.  The inability to impose
conditions on end users is only a problem if creators have the
expectation that they can impose conditions on end users.  That
expectation creates a likelihood of frustration for creators who
think that a bad actor is violating their license, just to find out
that their license does not really apply.  However, if creators
understand the purposes and limitations of open source hardware
licenses, that expectation can be eliminated (or at least reduced)
and the problem is essentially resolved.</p><p>That’s the
direction I’m inclined towards.  Admittedly it requires altering
norms and expectations that have been built up by open source
software for decades.  However, it won’t be the the only time that
open source hardware has to alter some of what it inherits from open
source software.  
</p><p><br/></p><p>*<i>This highlights a second major educational challenge around open source hardware. With open source software, teaching people about IP is fairly easy: they can assume that all software is protected by copyright. Hardware is much more complicated.  While any given  piece of hardware is likely at least partially protected by copyright, what that copyright actually covers will be somewhat idiosyncratic to the hardware itself.  As a result, it is going to be hard to develop everyday rules of thumb for what open source hardware licenses really do and do not control.  I’m hopefully that at some point a taxonomy of some sort will emerge, but that probably won’t happen anytime soon.</i></p>
