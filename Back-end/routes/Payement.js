var express = require('express');
const RendezVous = require('../models/RendezVous');
const Utilitaire = require('../utils/utilitaire');
var router = express.Router();


router.get('/:id' , Utilitaire.verifyToken ,async (req, res) => {
    const rdv = await RendezVous.find({ 
        client: req.params.id ,
        statut: 0
    }).populate('service');
    rdv.forEach(element => {
        element.service.offres_speciales=element.service.offres_speciales.filter(item=> (item.datedebut <= element.date && item.datefin >= element.date));
    });
    res.json(rdv);
});

router.get('/payer/:id', Utilitaire.verifyToken, async (req, res) => {
    const rdv =await RendezVous.findOneAndUpdate(
        {_id: req.params.id},
        {statut: 1},
        { new: true}
    );
    res.json("OK");
});

module.exports = router;
