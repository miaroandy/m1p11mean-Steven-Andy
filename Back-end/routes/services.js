var express = require('express');
var router = express.Router();
const connectDB = require('../utils/db');
const { ObjectId } = require('mongodb');

connectDB()
  .then(database => {
    const collection = database.collection('services_collection');

    router.post('/', async (req, res) => {
      const newService = req.body;
      const result = await collection.insertOne(newService);
      res.json({ _id: result.insertedId, ...newService });
    });

    router.get('/', async (req, res) => {
      const services = await collection.find().toArray();
      res.json(services);
    });

    router.get('/:id', async (req, res) => {
      const service = await collection.findOne({ _id: new ObjectId(req.params.id) });
      res.json(service);
    });

    router.put('/:id', async (req, res) => {
      const updatedService = req.body;
      await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedService });
      res.json({ message: 'Service mis à jour avec succès' });
    });

    router.delete('/:id', async (req, res) => {
      await collection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.json({ message: 'Service supprimé avec succès' });
    });

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
  })
  .catch(err => {
    console.error('Erreur de démarrage du serveur :', err);
  });

module.exports = router;
