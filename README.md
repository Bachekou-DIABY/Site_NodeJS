<img src="./data/header.png">

**DELAHAYE** Tom *(p2110727)* et **CISSE** Ahmed *(p1811047)* **DIABY** BACHEKOU *(p2108161)* **MARTINEZ** CHRISTOPHE *p1709105* 

## Sommaire <!-- omit in toc -->
- [A. Objectif](#a-objectif)
- [B. Arborescence](#b-arborescence)
- [C. Fonctionnalités](#c-fonctionnalités)
	- [C.1. Comment compiler le projet](#c1-compilation)
- [D. Précisions techniques](#d-précisions-techniques)
	- [D.1. JSP](#d1-jsp)
- [E. Modalités de rendu et deadline](#e-modalités-de-rendu-et-deadline)

## A. Objectif
[**Implémentation du projet RC1 (Data Explorable) en jsp dans le cadre de l'UE LIFPROJET.**](http://cazabetremy.fr/wiki/doku.php?id=projet:sujets"**ici**")

Le principe de ce projet est de Choisir une source de données accessible (open data, data crawling, etc), de collecter ces données, les analyser, et construire un “explorable” permettant à n'importe qui d'explorer ces données de manière interactive, typiquement sous la forme d'un site web.

Vous êtes libre de choisir les données qui vous intéresse, et nous discuterons des analyses que nous pouvons en faire (restitution sous forme de cartes, de réseaux/graphes, de graphiques interactifs, sous forme de site-web ou non, etc.).

Notez que si vous souhaitez vous orienter vers une Visualization originale, interactive, construite sur mesure, vous pouvez choisir à la place le sujet GR3. Ce sujet-ci est plus orienté données, et utilisera plutôt des outils de visualisation classique (leaflet pour des cartes, chartjs pour des graphiques, etc.). Par contre, dans ce sujet nous pouvons passer plus de temps à travailler sur les données elles-même, ou travailler sur des Big Data, etc.

Quelques exemples classiques de données: Données météorologiques, Données de santé (Covid…), Données sportives (résultats sportifs par saison ou par match…), Culturelles (données de films, de musique…), Restaurants/Musées… Mais aussi: (politique, réseaux sociaux, économie, environnement, sécurité, etc.) 

## B. Arborescence
Le code que nous avons  suit l'arborescence suivante :
```
Fichier  
    ├─ frontend (HTML,CSS,JavaScript)
        index.html 
    ├─ backend (python)
    └─ data(images)
```

> _**NB :** L'arborescence a été fait de sorte à ce que les fichiers soient ranger dans leur dossier **`data`** ou **`backend`** correspondant._
>
> 
## C. Fonctionnalités

### C.1. Comment compiler le projet

Le projet se compile grâce au Makefile avec la commande:
+ `make`         	

Un fichier éxecutable *(main.ex)* sera ensuite créé et il sera possible de l'executer a l'aide de la commande:
+ `cd ./bin` puis `./main.ex` (ou directement `./bin/main.ex`)

*étant donné que les fichiers éxecutables se trouvent dans le dossier `./bin`*

Pour afficher le test de performance d'un arbre il faut utiliser gnuplot :
+ `gnuplot` 
    + `set border 15`
    + `set xlabel"Taille de l'arbre" font ",20"`
    + `set ylabel "Temps d'insertion moyen" font ",20"`
    + `set key above center box`
    + `set tics nomirror`
    + `plot "./data/performances.txt" title "[titre]" with lines` permet d'afficher le graphique avec les données de performances.txt

## D. Précisions techniques
### D.1. JSP

La fonction jsp 


exemple de l'affichage : 

<img src="./data/BST.png">

<img src="./data/RBT.png">


## E. Modalités de rendu et deadline

Vous déposerez une archive `Nom1_Nom2_Nom3_Nom4.tgz` *(les Noms étant les noms des 4 étudiants composant le groupe)* de votre travail sur Tomuss . Les membres de l'équipe **Alt-TAB** jsp quoi

**La date limite de rendu est fixée au JSP JJ/DD/YYYY à XXhXX.** Le rendu sera suivi d'une bonne note.

Votre archive doit contenir un répertoire Nom1_Nom2 avec les sources de votre application. Les
sources sont bien évidemment tous les fichiers .cpp et .hpp, mais aussi le fichier Makefile, ainsi
que tout autre fichier ( README, etc.) utile à la compréhension de votre programme, ainsi qu’à son exécution.

**Attention !**

- Votre archive **NE DOIT PAS** contenir de fichiers exécutable (.ex).
- Le travail rendu doit être issu de la collaboration entre 4 personnes et toute récupération flagrante du code d’autrui sera sanctionnée.	               
- Votre programme doit pouvoir être compilé sans erreur ni avertissement avec XXX.
- Soignez bien votre programme principal (main.cpp) qui doit illustrer que les opérations à coder ont été faites correctement.


