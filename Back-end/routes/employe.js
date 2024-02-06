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

module.exports = router;
