var express = require('express');
const RendezVous = require('../models/RendezVous');
const Utilitaire = require('../utils/utilitaire');
var router = express.Router();


router.get('/', async (req, res) => {
    const rdv = await RendezVous.find();
    res.json(rdv);
});

router.get('/historique/:idclient', async (req, res) => {
    const rdv = await RendezVous.find({ client: req.params.idclient }).populate([
        { path: 'service' },
        { path: 'employe' }
    ]).sort({date: -1});
    res.json(rdv);
});

router.post('/employeLibre', Utilitaire.verifyToken, async (req, res) => {
    const emp = await Utilitaire.employeLibre(req.body.date);
    res.json(emp);
});

router.post('/', Utilitaire.verifyToken, async (req, res) => {
    const rdv = new RendezVous(req.body);
    await rdv.save();
    res.status(201).json(rdv);
});

module.exports = router;
