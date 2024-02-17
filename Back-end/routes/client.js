var express = require('express');
var router = express.Router();
const Client = require('../models/Client');
const Utilitaire= require("../utils/utilitaire");

router.get('/', async (req, res) => {
    const services = await Client.find();
    res.json(services);
});

router.get('/:id' ,getClient, (req, res) => {
    res.json(res.client);
});

async function getClient(req, res, next) {
    let client;
    try {
        client = await Client.findById(req.params.id).populate([
            { path: 'preferences.service' },
            { path: 'preferences.employe' }
        ]);
        if (client == null) {
            return res.status(404).json({ message: 'Client introuvable' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.client = client;
    next();
}

module.exports = router;
