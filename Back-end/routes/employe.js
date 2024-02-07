var express = require('express');
var router = express.Router();
const Employe = require('../models/Employe');

router.post('/', async (req, res) => {
try {
    const service = new Employe(req.body);
    await service.save();
    res.status(201).json(service);
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
