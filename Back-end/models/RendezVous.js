const mongoose = require('mongoose');

const rendezvousSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    employe: { type: mongoose.Schema.Types.ObjectId , ref: 'Employe'}
});

const RendezVous = mongoose.model('RendezVous', rendezvousSchema, 'rendezvous_collection');

module.exports = RendezVous;
