const mongoose = require('mongoose');
require('./Manager');

const depenseSchema = new mongoose.Schema({
    manager: { type: mongoose.Schema.Types.ObjectId , ref: 'Manager' },
    salaire: { type: Number },
    achat_piece: { type: Number },
    loyer: { type: Number },
    autres_depenses: { type: Number },  // Ne pas renvoyer le mot de passe par défaut
    date: { type: Date }
});

const Depense = mongoose.model('Depense', depenseSchema, 'depenses_collection');

module.exports = Depense;
