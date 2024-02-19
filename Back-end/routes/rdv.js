var express = require('express');
const RendezVous = require('../models/RendezVous');
var router = express.Router();


router.get('/', async (req, res) => {
    const rdv = await RendezVous.find();
    res.json(rdv);
});

router.get('/historique/:idclient', async (req, res) => {
    const rdv = await RendezVous.find({ client: req.params.idclient }).populate([
        { path: 'service' },
        { path: 'employe' }
    ]);
    res.json(rdv);
});

module.exports = router;
