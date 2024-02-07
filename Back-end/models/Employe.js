const mongoose = require('mongoose');

const horairesTravail = new mongoose.Schema({
  jour: { type: String, required: true },
  heure_debut: { type: String, required: true },
  heure_fin: { type: String, required: true }
});

const tachesEffectuees = new mongoose.Schema({
  rdv: { type: mongoose.Schema.Types.ObjectId, ref: 'RendezVous' },
  montant_commission: { type: Number }
});
const employeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String },
  email: { type: String, required: true },
  mot_de_passe: { type: String , select: false },  // Ne pas renvoyer le mot de passe par défaut
  horaires_travail:[horairesTravail],
  taches_effectuees: [tachesEffectuees]
});

const rendezvousSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  employe: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe' }
});

const RendezVous = mongoose.model('RendezVous', rendezvousSchema, 'rendezvous_collection');


const Employe = mongoose.model('Employe', employeSchema, 'employes_collection');

module.exports = Employe;
