const mongoose = require('mongoose');

const offresSpeciales = new mongoose.Schema({
  datedebut: { type: Date, required: true },
  datefin: { type: Date, required: true },
  reduction: { type: Number, required: true },
})

const serviceSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prix: { type: Number, required: true },
  duree: { type: Number },
  taux_commission: { type: Number },
  photo: { type: String },
  offres_speciales: [offresSpeciales]
});

const Service = mongoose.model('Service', serviceSchema, 'services_collection');

module.exports = Service;
