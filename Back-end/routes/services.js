var express = require('express');
var router = express.Router();
const Service = require('../models/Service')

router.post('/', async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  const services = await Service.find();
  res.json(services);
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

    // router.post('/services/:id/offres-speciales', async (req, res) => {
    //   const serviceId = req.params.id;
    //   const offreSpeciale = req.body;

    //   await collection.updateOne(
    //     { _id: new ObjectId(serviceId) },
    //     { $push: { offres_speciales: offreSpeciale } }
    //   );

    //   res.json({ message: 'Offre spéciale ajoutée avec succès' });
    // });

    // router.put('/services/:serviceId/offres-speciales/:offreId', async (req, res) => {
    //   const serviceId = req.params.serviceId;
    //   const offreId = req.params.offreId;
    //   const updatedOffreSpeciale = req.body;

    //   await collection.updateOne(
    //     { _id: new ObjectId(serviceId), 'offres_speciales._id': new ObjectId(offreId) },
    //     { $set: { 'offres_speciales.$': updatedOffreSpeciale } }
    //   );

    //   res.json({ message: 'Offre spéciale mise à jour avec succès' });
    // });

    // router.delete('/services/:serviceId/offres-speciales/:offreId', async (req, res) => {
    //   const serviceId = req.params.serviceId;
    //   const offreId = req.params.offreId;

    //   await collection.updateOne(
    //     { _id: new ObjectId(serviceId) },
    //     { $pull: { offres_speciales: { _id: new ObjectId(offreId) } } }
    //   );

    //   res.json({ message: 'Offre spéciale supprimée avec succès' });
    // });

module.exports = router;
