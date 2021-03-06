<img src="./data/header.jpg">

**DELAHAYE** Tom *(p2110727)* et **CISSE** Ahmed *(p1811047)* **DIABY** BACHEKOU *(p2108161)* **MARTINEZ** CHRISTOPHE *(p1709105)* 

## Sommaire <!-- omit in toc -->
- [A. Objectif](#a-objectif)
- [B. Arborescence](#b-arborescence)
- [C. Comment éxécuter le projet](#c-comment-executer-le-projet)

## A. Objectif
[**Implémentation du projet RC1 (Data Explorable) en jsp dans le cadre de l'UE LIFPROJET.**](http://cazabetremy.fr/wiki/doku.php?id=projet:sujets "**ici**")

Ce sujet consiste à choisir une source de données accessible (open data, data crawling, etc), de collecter ces données afin de les analyser, et construire un “explorable” permettant à n'importe qui d'explorer ces données de manière interactive, typiquement sous la forme d'un site web.
Dans le cadre de ce projet, on a fait le choix de travailler sur différentes sources d’énergies (nucléaires / fossiles / renouvelables), d’en extraire des données par le biais de différentes sources (base de données / sites internet / APIs) afin de les analyser et les mettres en forme au travers d’un site qui permet de consulter toutes ces données sur un même site.

## B. Arborescence
Le code que nous avons  suit l'arborescence suivante :
```
Fichier  
    ├─ data (annalyse des données avec jupyter)
    ├─ datascrapping (les différentes étapes de datascrapping)
    ├─ dataset (les données utilisés pour la carte)
    ├─ site/frontend
        /About      (un dossier par page web)
        /Accueil
        /Energymix
        /Linky
        /Map
        /Stats
        /public (les éléments statiques du projet, style, script, img, csv et les icones)
        app.js  ( définit les routes)
        server.js (définit la configuration du server)
    └─ README.md
```

> _**NB :** Le coeur du projet se projet se trouve des les dossiers **`site`** puis **`frontend`**._

## C. Comment éxécuter le projet 

*cloner le projet depuis GIT*

Installer node et npm (Linux)
+ `sudo apt install nodejs` puis `sudo apt install npm`

Dans le projet il faut ensuite se placer au bon endroit:
+ `cd site` puis ` cd frontend` (ou directement `cd site/frontend`)

*il faut ensuite installer  les dépendances du projet*
+ `npm install`       

Enfin pour lancer le site :
+ `nodemon server` 

*le site devrait avoir été lancé a l'adresse : localhost:4000/accueil*


