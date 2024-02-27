var express = require('express');
var router = express.Router();
const Service = require('../models/Service');
const Utilitaire = require('../utils/utilitaire');

router.post('/', async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/offreSpecial', async (req, res) => {
  const services = await Utilitaire.getOffresSpecial(new Date());
  res.json(services);
});

router.get('/home', async (req, res) => {
  const date=new Date();
  const services = await Service.find();
  services.forEach(element => {
    element.offres_speciales = element.offres_speciales.filter(item => (item.datedebut <= date && item.datefin >= date));
  });
  res.json(services);
});

router.get('/filter', async (req, res) => {
  try {
    const filterOptions = {};
    if (req.query.nom) {
      filterOptions.nom = { $regex: new RegExp(req.query.nom, 'i') };
    }

    if (!isNaN(req.query.prixMin) && !isNaN(req.query.prixMax)) {
      filterOptions.prix = { $gte: parseFloat(req.query.prixMin), $lte: parseFloat(req.query.prixMax) };
    } else if (!isNaN(req.query.prixMin)) {
      filterOptions.prix = { $gte: parseFloat(req.query.prixMin) };
    } else if (!isNaN(req.query.prixMax)) {
      filterOptions.prix = { $lte: parseFloat(req.query.prixMax) };
    }

    if (!isNaN(req.query.taux_commission)) {
      filterOptions.taux_commission = { $eq: parseFloat(req.query.taux_commission / 100) };
    }

    if (!isNaN(req.query.dureeMin) && !isNaN(req.query.dureeMax)) {
      filterOptions.duree = { $gte: parseInt(req.query.dureeMin), $lte: parseInt(req.query.dureeMax) };
    } else if (!isNaN(req.query.dureeMin)) {
      filterOptions.duree = { $gte: parseInt(req.query.dureeMin) };
    } else if (!isNaN(req.query.dureeMax)) {
      filterOptions.duree = { $lte: parseInt(req.query.dureeMax) };
    }

    if (Object.keys(filterOptions).length === 0) {
      const allServices = await Service.find();
      return res.json(allServices);
    }

    const services = await Service.find(filterOptions);
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

router.get('/:id/special', Utilitaire.verifyToken ,getService, (req, res) => {
  const date=new Date();
  res.service.offres_speciales = res.service.offres_speciales.filter(item => (item.datedebut <= date && item.datefin >= date));
  res.json(res.service);
});

router.get('/:id', getService, (req, res) => {
  res.json(res.service);
});

router.delete('/:id', async (req, res) => {
  try {
    await res.service.remove();
    res.json({ message: 'Service supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/offreSpeciale', getService, async (req, res) => {
  try {
    const service = res.service;

    const nouvelleOffreSpeciale = req.body;

    service.offres_speciales.push(nouvelleOffreSpeciale);
    await service.save();

    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getService(req, res, next) {
  let service;
  try {
    service = await Service.findById(req.params.id);
    if (service == null) {
      return res.status(404).json({ message: 'Service introuvable' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.service = service;
  next();
}

module.exports = router;
