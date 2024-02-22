const express = require('express');
const router = express.Router();
const Employe = require('../models/Employe');
const RendezVous = require('../models/RendezVous');
const Depense = require('../models/Depense');

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
                {
                  $hour: {
                    $dateFromString: {
                      dateString: {
                        $concat: [
                          "2022-01-01T",
                          "$horaires_travail.heure_fin",
                          ":00"
                        ]
                      },
                      format: "%Y-%m-%dT%H:%M:%S"
                    }
                  }
                },
                {
                  $hour: {
                    $dateFromString: {
                      dateString: {
                        $concat: [
                          "2022-01-01T",
                          "$horaires_travail.heure_debut",
                          ":00"
                        ]
                      },
                      format: "%Y-%m-%dT%H:%M:%S"
                    }
                  }
                }
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

// Chiffre d’affaires par jour
router.get('/chiffre-affaires-jour', async (req, res) => {
  try {
    const result = await RendezVous.aggregate([
      {
        $lookup: {
          from: "services_collection",
          localField: "service",
          foreignField: "_id",
          as: "service_info"
        }
      },
      {
        $group: {
          _id: { $dayOfMonth: "$date" },
          chiffre_affaires: { $sum: "$service_info.prix" }
        }
      }
    ]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération du chiffre d\'affaire par jour.');
  }
});

// Chiffre d’affaires par mois
router.get('/chiffre-affaires-mois', async (req, res) => {
  try {
    const result = await getChiffreAffairesParMois();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération du chiffre d\'affaire par mois.');
  }
});

// Bénéfice par mois en entrant les dépenses
router.get('/benefice-mois', async (req, res) => {
  try {
    const chiffreAffairesParMois = await getChiffreAffairesParMois();
    const depensesTotalesParMois = await getDepensesTotalesParMois();

    // Convertir les dépenses en un objet pour un accès facile
    const depensesMap = {};
    depensesTotalesParMois.forEach(depense => {
      const key = `${depense._id.year}-${depense._id.month}`;
      depensesMap[key] = depense.totalDepenses;
    });

    // Calculer le bénéfice
    const beneficeParMois = chiffreAffairesParMois.map(chiffre => {
      const key = `${chiffre._id.year}-${chiffre._id.month}`;
      const depenses = depensesMap[key] || 0;
      const benefice = chiffre.chiffreAffaires - depenses;
      return {
        annee: chiffre._id.year,
        mois: chiffre._id.month,
        chiffreAffaires: chiffre.chiffreAffaires,
        depenses,
        benefice
      };
    });

    res.json(beneficeParMois);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des bénéfices par mois.');
  }
});

// Chiffre d'affaires par mois
async function getChiffreAffairesParMois() {
  return RendezVous.aggregate([
    {
      $lookup: {
        from: "services_collection", 
        localField: "service",
        foreignField: "_id",
        as: "service_info"
      }
    },
    { $unwind: "$service_info" },
    {
      $group: {
        _id: { month: { $month: "$date" }, year: { $year: "$date" } },
        chiffreAffaires: { $sum: "$service_info.prix" }
      }
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 }
    }
  ]);
}

// Dépenses totales par mois
async function getDepensesTotalesParMois() {
  return Depense.aggregate([
    {
      $group: {
        _id: { month: { $month: "$date" }, year: { $year: "$date" } },
        totalDepenses: { $sum: { $add: ["$salaire", "$loyer", "$achat_piece", "$autres_depenses"] } }
      }
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 }
    }
  ]);
}

module.exports = router;