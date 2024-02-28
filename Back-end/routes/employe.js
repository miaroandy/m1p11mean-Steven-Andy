var express = require('express');
var router = express.Router();
const Employe = require('../models/Employe');
const Service = require('../models/Service');
const RendezVous = require('../models/RendezVous');
const Utilitaire = require('../utils/utilitaire');

router.post('/', async (req, res) => {
try {
    req.body.mot_de_passe= Utilitaire.cryptMDP(req.body.mot_de_passe);
    const service = new Employe(req.body);
    await service.save();
    res.status(201).json(service);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

router.get('/:id/tache', async (req, res) => {
    const rdv = await RendezVous.find({
        employe: req.params.id,
        statut: 2
    }).populate([
        { path: 'service', select: '-photo'},
        { path: 'client', select:'-preferences'}
    ]);
    res.json(rdv);
});

router.post('/:id/horaire/delete', async (req, res) => {
    try {
        await Employe.findOneAndUpdate(
            { _id: req.params.id }, 
            { $pull: { horaires_travail: { jour: req.body.jour } } },
            { new: true }
        );
        res.status(201).json("Supprimé");
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/:id/horaire', async (req, res) => {
    try {
        const horaire = {
            heure_debut: req.body.debut,
            heure_fin: req.body.fin,
            jour:req.body.jour
        }

        Employe.findOneAndUpdate(
            { _id: req.params.id, 'horaires_travail.jour': req.body.jour }, 
            { $set: { 'horaires_travail.$.heure_debut': req.body.debut, 'horaires_travail.$.heure_fin': req.body.fin } }, 
            { new: true } 
        ).then(updatedEmploye => {
                if (updatedEmploye) {
                    console.log('Horaires de travail mis à jour:', updatedEmploye);
                } else {
                    return Employe.findByIdAndUpdate(
                        req.params.id,
                        { $push: { horaires_travail: horaire } },
                        { new: true }
                    );
                }
            })

        res.status(201).json("OK");
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    const services = await Employe.find();
    res.json(services);
});

router.get('/:id', getEmploye, (req, res) => {
    res.json(res.employe);
});

router.delete('/:id',getEmploye, async (req, res) => {
    try {
        await res.employe.remove();
        res.json({ message: 'Employe supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getEmploye(req, res, next) {
    let employe;
    try {
        employe = await Employe.findById(req.params.id).populate('taches_effectuees.rdv');
        if (employe == null) {
            return res.status(404).json({ message: 'Employe introuvable' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.employe = employe;
    next();
}


module.exports = router;
