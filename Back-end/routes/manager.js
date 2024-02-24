var express = require('express');
var router = express.Router();
const Manager = require('../models/Manager');
const Mail = require('../utils/mail');

router.post('/', async (req, res) => {
try {
    const service = new Manager(req.body);
    await service.save();
    res.status(201).json(service);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

router.get('/sendmail', async (req, res) => {
    try {
        const mail = new Mail("miaroandy25@gmail.com", "nouvelle offre speciale");
        const htmlbody = "<h2>Une nouvelle offre spéciale</h2><p>Réduction de <strong>20%</strong> sur tous les massages.</p>      <p> Épilation complète à seulement <strong>50€</strong>.</p>      <p>Profitez de ces offres exclusives dès <strong>aujourd'hui!</strong></p>";
        const info = mail.sendMail(htmlbody);
        res.json({ message: 'envoi en cours' });
    } catch (err) {
        res.status(500).json({ message: err.message });
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
