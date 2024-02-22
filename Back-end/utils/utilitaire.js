const jwt = require('jsonwebtoken');
const Service = require('../models/Service');
const Employe = require('../models/Employe');
const RendezVous = require('../models/RendezVous');
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

    static jourSemaine(date){
        let jourDeLaSemaine = date.getDay();
        let jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        return jours[jourDeLaSemaine];
    }

    static stringToTime(time){
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        return date;
    }

    static async employeQuiTravail(date){
        const jourSemaine=Utilitaire.jourSemaine(date);
        const datecompare=new Date();
        datecompare.setHours(date.getHours());
        datecompare.setMinutes(date.getMinutes());
        //maka employe miasa amle jour
        let emp=await Employe.find({
            'horaires_travail':{
                $elemMatch :{
                    jour: jourSemaine,
                }
            }
        })
        //jerena oe ao anatinle heur hiasany 
        emp.forEach(element => {
            element.horaires_travail.forEach(travail =>{
                if(travail.jour===jourSemaine){
                    const datedebut=Utilitaire.stringToTime(travail.heure_debut);
                    const datefin = Utilitaire.stringToTime(travail.heure_fin);
                    if(!(datedebut<=datecompare && datefin>=datecompare)){
                        emp=emp.filter(item => item._id !== element._id);
                    }
                }
            })
        });
        return emp;
    }

    static async employeLibre(dateString){
        const date = new Date(dateString);
        let emp=await Utilitaire.employeQuiTravail(date);
        const rdv = await RendezVous.find({ employe: { $in: emp } }).populate([
            { path: 'service' }
        ]);
        rdv.forEach(element => {
            const datefin =new Date(element.date.setMinutes(element.date.getMinutes()+element.service.duree));
            console.log(datefin);
            console.log(element.date)
            if(element.date<=date && datefin>=date){
                emp = emp.filter(item => item._id !== element.employe);
            }
        })
        return emp;
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