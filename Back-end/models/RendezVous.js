const mongoose = require('mongoose');
require('./Employe');
require('./Service');
require('./Client');


const rendezvousSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    employe: { type: mongoose.Schema.Types.ObjectId , ref: 'Employe'},
    service: { type: mongoose.Schema.Types.ObjectId , ref: 'Service'},
    client: { type: mongoose.Schema.Types.ObjectId ,ref: 'Client'},
    statut:{ type: Number}
});

const RendezVous = mongoose.model('RendezVous', rendezvousSchema, 'rendezvous_collection');

module.exports = RendezVous;
