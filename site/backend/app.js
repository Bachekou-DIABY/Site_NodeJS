const express = require('express');
const mongoose = require('mongoose');
const GlobalPowerPlants = require('./models/GlobalPowerPlants');

const app = express();
app.use(express.json());

//Gere la connexion a la bdd
mongoose.connect('mongodb+srv://ALT-TAB:sadP3nmc1R52ez8z@alt-tab.sqrcj.mongodb.net/NuclearPowerPlants?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Permettent respectivement:
//d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
//d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
//d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Configuration de la route POST permettant d'envoyer des données dans la BDD


  app.get('/api/powerplant/:id', (req, res, next) => {
    GlobalPowerPlants.findOne({ _id: req.params.id }) //Recupere un element en particulier de la table  identifié par son id unique (methode findOne)
      .then(GlobalPowerPlants => res.status(200).json(GlobalPowerPlants))
      .catch(error => res.status(404).json({ error }));
  });

  app.use('/api/powerplant', (req, res, next) => {
    GlobalPowerPlants.find() //Recupere tout les elements contenu dans la table  (methode find)
      .then(GlobalPowerPlants => res.status(200).json(GlobalPowerPlants))
      .catch(error => res.status(400).json({ error }));
  });

  
  module.exports = app;