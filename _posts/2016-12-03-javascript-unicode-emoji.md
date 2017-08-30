---
tags: parisjs60
title: "JavaScript, Unicode and the Emoji family"
authors:
    - name: "Stefan Judis"
      url: https://twitter.com/stefanjudis
      avatar: https://pbs.twimg.com/profile_images/773874373010792448/K74ngFDn.jpg
projects:
slides:
    - https://speakerdeck.com/stefanjudis/unicode-javascript-and-the-emoji-family
videos:
---
In this quick lightning talk I want to go into into Unicode and have a look at Emojis specifically. How does JavaScript treat Unicode and why do the following examples work?

Why does this work?
[...'👨‍👩‍👦'] // ["👨", "‍", "👩", "‍", "👦"]

And what's the deal with this?
'👨‍👩‍👦'.length // 8
