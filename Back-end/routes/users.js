var express = require('express');
const Client = require('../models/Client');
const Utilitaire = require('../utils/utilitaire');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/favoris',Utilitaire.verifyToken, async (req, res) => {
  try {
    const favoris={
      service: req.body.service,
      employe: req.body.employe
    }
    const result = await Client.findOneAndUpdate(
      { _id: req.body.id }, 
      { $pull: { preferences: favoris } }, 
    );

    const result1 = await Client.findOneAndUpdate(
      { _id: req.body.id },
      { $push: { preferences: favoris } },
    );
    res.status(201).json(result1);
  } catch (err) {
    consolo.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.post('/favoris/remove', Utilitaire.verifyToken, async (req, res) => {
  try {
    const favoris = {
      service: req.body.service,
      employe: req.body.employe
    }
    const result = await Client.findOneAndUpdate(
      { _id: req.body.id },
      { $pull: { preferences: favoris } },
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = router;
