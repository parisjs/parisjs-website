---
tags: parisjs50
title: "After the render tree"
authors:
    - name: "Freddy Harris"
      url: https://twitter.com/harrisfreddy
      avatar: https://twitter.com/harrisfreddy/profile_image?size=bigger
projects:
slides:
    - http://freddy03h.github.io/render-presentation/#/
videos:
---
Je compte expliquer en détails les étapes qui viennent après le render tree dans le browser : layout/reflow, paint, composite. Le but étant de mieux comprendre ce qui se passe dans le navigateur pour créer des animations performantes.

Souvent on retient les bonnes pratiques (animer les margin c'est mal par exemple), c'est pratique, c'est prêt à appliquer mais le problème c'est que ces bonnes pratiques peuvent devenir obsolètes voir néfastes (accélération matériel à tout va avec translateZ(0) ) et ne permettent pas bien de comprendre pourquoi certaines features sont salutaires (comme css will-change ou la web animation api).
