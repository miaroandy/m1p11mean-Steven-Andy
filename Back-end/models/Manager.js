const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String },
    email: { type: String, required: true },
    mot_de_passe: { type: String, select: false }  // Ne pas renvoyer le mot de passe par défaut
});

const Manager = mongoose.model('Manager', managerSchema, 'managers_collection');

module.exports = Manager;
