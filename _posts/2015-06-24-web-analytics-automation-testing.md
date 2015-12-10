---
tags: parisjs48
title: "Web Analytics Automation Testing – Data beats Opinions"
authors:
    - name: "Elalami Lafkih"
      url: https://twitter.com/e_lalami
      avatar: https://twitter.com/e_lalami/profile_image?size=bigger
projects:
slides:
---
Web analytics implementation is much more complex than most people think. Testing Web Analytics remains a cumbersome and complex task. Basically we have 4 alternatives:

1- Blind faith: Trust and wish everything is right… or check only the pages that are part of your KPIs and funnels and hope for the best.
2- Debuggers & proxies: Visit all pages through a proxy to make sure the tags are working as expected. Then wait… and check in your web analytics tools of choice to see if it was recorded correctly.
3- Crawlers: Use a high-end tool or something like Web Link Validator.
4- WASP: The Web Analytics Solution Profiler is a sidebar that offers page-by-page view of the tags as you surf. The crawler allows you to check a full site or section of a site.

These approaches may work if you have a few tags in your website but definitely not if there are more than 500 variables to record, such as events, properties, tags, and so on. In this case, the automation of data correctness tests becomes crucial.

During this session we will use a one-year real project to show you how a cross-functional team worked together to build a test framework based on open source tools. The team of Web Analyst, Developer in Test and Programmer worked together to build an Web Analytics Testing Framework and validate the correct Tagging. Our lesson is: “never assume, always check as early and as often as possible.”
