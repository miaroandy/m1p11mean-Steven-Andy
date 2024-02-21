const express = require('express');
const router = express.Router();
const Employe = require('./models/Employe');
const RendezVous = require('./models/RendezVous');
const Depense = require('./models/Depense');

// Temps moyen de travail pour chaque employé
router.get('/temps-travail', async (req, res) => {
  try {
    const result = await Employe.aggregate([
      {
        $unwind: "$horaires_travail"
      },
      {
        $group: {
          _id: "$_id",
          nom: { $first: "$nom" },
          prenom: { $first: "$prenom" },
          temps_moyen_travail: {
            $avg: {
              $subtract: [
                { $hour: "$horaires_travail.heure_fin" },
                { $hour: "$horaires_travail.heure_debut" }
              ]
            }
          }
        }
      }
    ]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération du temps moyen de travail pour chaque employé.');
  }
});

// Le nombre de réservations par jour
router.get('/reservations-jour', async (req, res) => {
  try {
    const result = await RendezVous.aggregate([
      {
        $group: {
          _id: { $dayOfMonth: "$date" },
          nombre_reservations: { $sum: 1 }
        }
      }
    ]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des réservations par jour.');
  }
});

// Le nombre de réservations par mois
router.get('/reservations-mois', async (req, res) => {
  try {
    const result = await RendezVous.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          nombre_reservations: { $sum: 1 }
        }
      }
    ]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des réservations par mois.');
  }
});

module.exports = router;