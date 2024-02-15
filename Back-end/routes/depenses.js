var express = require('express');
var router = express.Router();
const Depense = require('../models/Depense');

router.post('/', async (req, res) => {
try {
    const service = new Depense(req.body);
    await service.save();
    res.status(201).json(service);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

router.get('/', async (req, res) => {
    const services = await Depense.find();
    res.json(services);
});

router.get('/:id', getDepense, (req, res) => {
    res.json(res.depense);
});

router.delete('/:id',getDepense, async (req, res) => {
    try {
        await res.depense.remove();
        res.json({ message: 'Depense supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getDepense(req, res, next) {
    let depense;
    try {
        depense = await Depense.findById(req.params.id);
        if (depense == null) {
            return res.status(404).json({ message: 'Depense introuvable' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.depense = depense;
    next();
}


module.exports = router;
