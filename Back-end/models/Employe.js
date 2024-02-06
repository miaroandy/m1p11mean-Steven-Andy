const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String },
  email: { type: String, required: true },
  mot_de_passe: { type: String , select: false },  // Ne pas renvoyer le mot de passe par défaut
});

const Employe = mongoose.model('Employe', employeSchema, 'employes_collection');

module.exports = Employe;
