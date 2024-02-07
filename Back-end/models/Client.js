const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String },
    email: { type: String, required: true },
    mot_de_passe: { type: String, select: false },  // Ne pas renvoyer le mot de passe par défaut
    numero: { type: String}
});

const Client = mongoose.model('Client', clientSchema, 'clients_collection');

module.exports = Client;
