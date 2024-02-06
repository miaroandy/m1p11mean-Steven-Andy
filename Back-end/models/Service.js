const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prix: { type: Number, required: true },
  duree: { type: Number },
  taux_commission: { type: Number },
});

const Service = mongoose.model('Service', serviceSchema, 'services_collection');

module.exports = Service;
