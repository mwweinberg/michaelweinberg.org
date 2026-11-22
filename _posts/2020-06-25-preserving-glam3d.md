---
layout: post
category: blog
title: Preserving Glam3D.org
date: 2020-06-25
tags:
- openaccess
- copyright
- glam
image:
     feature: glam3d_header.jpg

---

*This post [originally appeared](https://www.law.nyu.edu/centers/engelberg/news/2020-06-24-preserving-glam3d) on the Engelberg Center blog.*

We anticipate being able to support [Glam3D.org](https://glam3d.org/), our newly launched site focusing on creating Open Access 3D cultural resources, well into the future.  Nonetheless, we also recognize that technology evolves, priorities change, and that there may be a day where the site is no longer viable.  As a result, we have taken steps to make it easier to preserve the site if and when it is no longer active.

In many situations, planning to preserve digital resources can be an elaborate task.  Sites built on complex content management systems (CMS) relying on proprietary software can simply disappear.  Even the most ubiquitous technologies can fade over time (see, for example, [attempts to preserve flash-based web media](https://bluemaxima.org/flashpoint/) now that flash is no longer actively supported).  Although organizations like the [Internet Archive](https://archive.org/) work hard to preserve some digital resources, even their powers have limits.

This makes it important to build digital preservation planning into the structure of a site from the beginning. While it is impossible to anticipate every eventuality, it is possible to follow best practices that help maximize the chance that the resource will be accessible well into the future.

Ease of preservation was one of the reasons we decided to build [Glam3D.org](https://glam3d.org/) with the [Jekyll](https://jekyllrb.com/) framework. Jekyll uses a [static site](https://davidwalsh.name/introduction-static-site-generators) approach.  Among other things, that means that there is no traditional backend (such as wordpress or drupal) holding all of the content in a format that is inaccessible to the site’s visitors.  Instead, Jekyll uses [markdown files](https://github.com/NYUEngelberg/NYUEngelberg.github.io/tree/master/pages/GLAM3D) - which are human-readable text files - to make each page of the site.  It draws images from a folder that is helpfully called “[images](https://github.com/NYUEngelberg/NYUEngelberg.github.io/tree/master/images)”.

This approach makes sure that the heart of the site - the text, images, links, and structure - are simply a series of text files, images, and folders that are easy to navigate.  Furthermore, all of the files are publicly available (and freely licensed) on the [Engelberg Center github page](https://github.com/NYUEngelberg/NYUEngelberg.github.io).  Anyone can go to the github repo and download all of the files required to make the site.  The repo also contains all of the prior versions of the site.

Jekyll itself is open source software.  That makes it easy for someone to reproduce the entire site by downloading Jekyll, downloading our repo, and just putting them together.  It also means that someone attempting to reproduce the site well in the future will be able to find the version of Jekyll we used to build the site today and modify it to work on whatever computers they have access to.

As part of our digital preservation efforts, we will use [Conifer](https://conifer.rhizome.org/), a web archiving tool by [Rhizome](https://rhizome.org/editorial/tags/webrecorder/), to collect and capture the interactivity of navigating the site as dynamic web content. At moments of substantive updates, we plan to create screen capture tutorials with commentary to provide users of the site an overview of the components. These videos, hosted on the publication site with a Creative Commons Attribution 4.0 license, will also serve as another means to preserve the publication.

Preservation is an evolving practice, so please [contact us](https://glam3d.org/about.html) with your recommendations about other forms of preservation that we should consider.
