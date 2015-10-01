---
tags: parisjs49
title: "Happy Path, Sad Path"
authors:
    - name: "Pierre de Captain Train"
      url:
      avatar:
projects:
    - https://www.captaintrain.com/
slides:
    - https://speakerdeck.com/kemenaran/happy-path-sad-path
videos:
---
Sur Capitaine Train, le Happy Path (celui où tout se passe bien pour l’utilisateur) est très, très rapide. Une dizaine de clics tout au plus pour acheter un billet de train. Mais évidemment tout ne va pas toujours bien : il y a des trains complets, des paiements échoués, des coupures de réseau et des timeout. Souvent plusieurs de ces erreurs se combinent : c’est le Sad Path.

Le Sad Path est trop souvent la partie négligée d’une application. Mais ignorer le Sad Path, c’est décevoir l'utilisateur au premier imprévu. Dans notre application, le Sad Path occupe allègrement 4 fois plus de place que le Happy Path : comment implémenter tous ces cas d'erreurs et ces avertissements, les coordonner entre eux, les maintenir ? Comment éviter l’effet « sapin de Noël », une montagne de messages oranges et rouges que plus personne ne lit ? Et surtout comment ne pas laisser le Sad Path déteindre sur le Happy Path ? C’est compliqué, mais teaser : il y a des tests d’acceptance et des Promesses ES2015.
