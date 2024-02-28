const express = require('express');
const router = express.Router();
const Employe = require('../models/Employe');
const RendezVous = require('../models/RendezVous');
const Depense = require('../models/Depense');
const Utilitaire = require('../utils/utilitaire');

// Temps moyen de travail pour chaque employé
router.get('/temps-travail', Utilitaire.verifyToken, async (req, res) => {
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
          total_temps_travail: {
            $sum: {
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
      },
      {
        $project: {
          _id: 1,
          nom: 1,
          prenom: 1,
          temps_moyen_travail: { $divide: ["$total_temps_travail", 6] }
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
router.get('/reservations-jour',Utilitaire.verifyToken, async (req, res) => {
  try {
    if (req.user.role !=='admin'){
      return res.status(401).json({ message: 'Token invalide' });
    }
    const result = await RendezVous.aggregate([
      {
        $group: {
          _id: { 
            day : { $dayOfMonth: "$date" },
            month: { $month: "$date" },
            year: { $year: "$date" }
          },
          nombre_reservations: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
      }
    ]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des réservations par jour.');
  }
});

// Le nombre de réservations par mois
router.get('/reservations-mois', Utilitaire.verifyToken,async (req, res) => {
  try {
    const result = await RendezVous.aggregate([
      {
        $group: {
          _id: { 
            month: { $month: "$date" },
            year: { $year: "$date" }
          },
          nombre_reservations: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1}
      }
    ]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des réservations par mois.');
  }
});

// Chiffre d’affaires par jour
router.get('/chiffre-affaires-jour',Utilitaire.verifyToken, async (req, res) => {
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
      { $unwind: "$service_info" },
      {
        $group: {
          _id: { 
            day : { $dayOfMonth: "$date" },
            month: { $month: "$date" },
            year: { $year: "$date" }
          },
          chiffre_affaires: { 
            $sum: { 
              $cond: [
                { $gt: [{ $size: "$service_info.offres_speciales" }, 0] },
                {
                  $let: {
                    vars: {
                      matchingOffer: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$service_info.offres_speciales",
                              cond: {
                                $and: [
                                  { $gte: ["$date", "$$this.datedebut"] },
                                  { $lte: ["$date", "$$this.datefin"] }
                                ]
                              }
                            }
                          },
                          0
                        ]
                      }
                    },
                    in: {
                      $cond: [
                        { $ifNull: ["$$matchingOffer.reduction", false] },
                        {
                          $multiply: [
                            "$service_info.prix",
                            { $subtract: [1, { $divide: ["$$matchingOffer.reduction", 1] }] }
                          ]
                        },
                        "$service_info.prix"
                      ]
                    }
                  }
                },
                "$service_info.prix"
              ]
            }
          }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
      }
    ]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération du chiffre d\'affaire par jour.');
  }
});

// Chiffre d’affaires par mois
router.get('/chiffre-affaires-mois',Utilitaire.verifyToken, async (req, res) => {
  try {
    const result = await getChiffreAffairesParMois();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération du chiffre d\'affaire par mois.');
  }
});

// Bénéfice par mois en entrant les dépenses
router.get('/benefice-mois',Utilitaire.verifyToken, async (req, res) => {
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
      const benefice = chiffre.chiffre_affaires - depenses;
      return {
        annee: chiffre._id.year,
        mois: chiffre._id.month,
        chiffre_affaires: chiffre.chiffre_affaires,
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
        chiffre_affaires: { 
          $sum: { 
            $cond: [
              { $gt: [{ $size: "$service_info.offres_speciales" }, 0] },
              {
                $let: {
                  vars: {
                    matchingOffer: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$service_info.offres_speciales",
                            cond: {
                              $and: [
                                { $gte: ["$date", "$$this.datedebut"] },
                                { $lte: ["$date", "$$this.datefin"] }
                              ]
                            }
                          }
                        },
                        0
                      ]
                    }
                  },
                  in: {
                    $cond: [
                      { $ifNull: ["$$matchingOffer.reduction", false] },
                      {
                        $multiply: [
                          "$service_info.prix",
                          { $subtract: [1, { $divide: ["$$matchingOffer.reduction", 1] }] }
                        ]
                      },
                      "$service_info.prix"
                    ]
                  }
                }
              },
              "$service_info.prix"
            ]
          }
        }
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
        totalDepenses: { $sum: { 
          $add: [
            { $ifNull: ["$salaire", 0] },
            { $ifNull: ["$loyer", 0] },
            { $ifNull: ["$achat_piece", 0] },
            { $ifNull: ["$autres_depenses", 0] }
          ] }
        }
      }
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 }
    }
  ]);
}

module.exports = router;