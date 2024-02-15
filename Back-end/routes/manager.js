var express = require('express');
var router = express.Router();
const Manager = require('../models/Manager');

router.post('/', async (req, res) => {
try {
    const service = new Manager(req.body);
    await service.save();
    res.status(201).json(service);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

router.get('/', async (req, res) => {
    const services = await Manager.find();
    res.json(services);
});

router.get('/:id', getManager, (req, res) => {
    res.json(res.manager);
});

router.delete('/:id',getManager, async (req, res) => {
    try {
        await res.manager.remove();
        res.json({ message: 'Manager supprimé' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getManager(req, res, next) {
    let manager;
    try {
        manager = await Manager.findById(req.params.id);
        if (manager == null) {
            return res.status(404).json({ message: 'Manager introuvable' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.manager = manager;
    next();
}


module.exports = router;
