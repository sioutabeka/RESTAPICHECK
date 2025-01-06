const express = require('express');
// const mongoose = require('mongoose');
const app = express();

// connecter a mongo
const mongoose = require('mongoose');

// ici on charge les variables de l'environnement 
require('dotenv').config({ path: './config/.env'});

//Middleware pr parcer le JSON
app.use(express.json()); 

// route test 
app.get('/', (req, res) => {
    res.send('API roule (en mode server is running')
});

// lancer le serveur sur le port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`);
});

// Connexion Mongo
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('mongoDB c coco'))
.catch(err => console.error('mongo c pas ok', err));

const User = require('./models/User');

// Ajouter les routes 

// 1) GET
app.get('/users', (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({error: err.message}))
}); 

// Route POST 
app.post('/users', (req, res) => {
    const newUser = new User(req.body); // on crée un user
    newUser.save()
        .then(savedUser => res.status(201).json(savedUser))
        .catch(err => res.status(400).json({error: err.message}));
}); 

// Test postman http://localhost:3000/users

// Route PUT
app.put('/users', (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    .then(updateUser => res.status(200).json(updateUser))
    .catch(err => res.status(400).json({error: err.message}));
});

// Route Delete
app.delete('/users', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(updateUser => res.status(200).json({message: 'Cbon c supprimé'}))
    .catch(err => res.status(500).json({error: err.message}));
});