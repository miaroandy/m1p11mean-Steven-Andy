const jwt = require('jsonwebtoken');
const Service = require('../models/Service');
const secret_key = process.env.secretKey;

class Utilitaire {
    
    static verifyToken(req, res, next) {
        const bearer = req.headers.authorization;
        if (!bearer) {
            return res.status(401).json({ message: 'Token manquant' });
        }
        const token= bearer.split(' ')[1];
        
        try {
            const decoded = jwt.verify(token, secret_key);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token invalide' });
        }

        
    }

    static async getOffresSpecial(date){
        const offres = await Service.find({ 
            'offres_speciales': {
                $elemMatch: {
                    datedebut: { $lte: date }, 
                    datefin: { $gte: date }    
                }
            }
        });
        offres.forEach(element => {
            element.offres_speciales= element.offres_speciales.filter(item => (item.datedebut <= date && item.datefin>=date));
        });
        return offres;
    }
}

module.exports = Utilitaire;