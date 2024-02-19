var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const Employe = require('../models/Employe');
const Client = require('../models/Client');
const Manager = require('../models/Manager');
const crypto = require('crypto');
const secretKey = process.env.secretKey;


router.post('/', async (req, res) => {
    try {
        const result= await login(req, res);
        if (result.length==0){
            res.status(401).json({message: 'Mot de passe incorrect'});
        } else{ 
            const payload = {
                nom: result[0].nom, 
                prenom: result[0].prenom, 
                email: result[0].email,
                role: req.body.role
            };
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            res.status(201).json({ 
                token: token,
                role: req.body.role,
                identifiant: result[0]._id
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/inscription', async (req, res) => {
    try {
        req.body.mot_de_passe = cryptMDP(req.body.mot_de_passe);
        const client = new Client(req.body);
        await client.save();
        res.status(201).json(client);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


async function login(req,res) {
    const login={
        email: req.body.email,
        mot_de_passe: cryptMDP(req.body.mdp)
    };
    let result= null;
    if (req.body.role === 'client') {
        result = await Client.find(login);
    }
    else if (req.body.role==='employe'){
        result= await Employe.find(login);
    }
    else if (req.body.role === 'admin') {
        result = await Manager.find(login);
    }
    return result;
}

function cryptMDP(mdp){
    const hash = crypto.createHash('sha256');
    hash.update(mdp);
    const hashHex = hash.digest('hex');
    return hashHex;
}

module.exports = router;
