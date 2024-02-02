var express = require('express');
var router = express.Router();
const connectDB = require('../utils/db');

const appel = async () => {
    try {
        const db = await connectDB();
        const collection = db.collection("employes_collection");
        return collection;
    } catch (error) {
        console.error('Erreur lors de la configuration de l\'application', error);
    }
};

appel().then((resultat) =>{

    router.get('/', async function (req, res, next) {
        resultat.find().toArray()
            .then(results => {
                res.json(results)
            })
            .catch(error => console.log(error))
    });

    router.post('/', (req, res) => {
        resultat.insertOne(req.body)
            .then(result => {
                res.json(result)
            })
            .catch(error => console.error(error))
    })

}).catch((erreur)=>{
    console.error(erreur)
});

module.exports = router;
