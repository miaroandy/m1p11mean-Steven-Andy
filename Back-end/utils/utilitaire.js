const jwt = require('jsonwebtoken');
const Service = require('../models/Service');
const Employe = require('../models/Employe');
const RendezVous = require('../models/RendezVous');
const Client = require('../models/Client');
const Mail = require('./mail');
const secret_key = process.env.secretKey;

class Utilitaire {

    static async notificationOffresSpeciales(service,offresSpeciales){
        const client= await Client.find();

        let recipient="";
        let indice=0;
        client.forEach(element => {
            if(indice==0){
                recipient=element.email;
                indice=1;
            }else{
                recipient=recipient+","+element.email;
            }
        });
        console.log(recipient);

        const prix=service.prix-(service.prix*offresSpeciales.reduction);

        const htmlbody = "<h2>Une nouvelle offre spéciale</h2><p>Réduction de <strong>"+offresSpeciales.reduction+"</strong> sur tous les "+service.nom+".</p>      <p> "+service.nom+" à seulement <strong>"+prix+"</strong>.</p>      <p>Profitez de ces offres exclusives dès le <strong>"+offresSpeciales.datedebut+"</strong> jusqu'au <strong>"+offresSpeciales.datefin+"</strong></p>";

        const mail = new Mail(recipient, 'Offres Spéciales')
        mail.sendMail(htmlbody);
    }
    
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
                    console.log("travail");
                    console.log(datedebut+" "+datefin+" "+datecompare);
                    if(!(datedebut<=datecompare && datefin>=datecompare)){
                        emp=emp.filter(item => item._id !== element._id);
                    }
                }
            })
        });
        return emp;
    }

    static async employeLibre(dateString){
        let date = new Date(dateString);
        let emp=await Utilitaire.employeQuiTravail(date);
        const rdv = await RendezVous.find({ employe: { $in: emp } }).populate({ 
            path: 'service' ,
            select: '-photo'
        });
        //date.setHours(date.getHours() + 3);
        rdv.forEach(element => {
            let datefin =new Date(element.date.toString());
            datefin.setMinutes(element.date.getMinutes()+element.service.duree);
            console.log("libre");
            console.log(element.date + " " + datefin + " " + date);
            if(element.date<=date && datefin>date){
                emp = emp.filter(item => item._id.toString() !== element.employe.toString());
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

    static async getPromotion(date) {
        const offres = await Service.find({
            'offres_speciales': {
                $elemMatch: {
                    datedebut: { $gte: date }
                }
            }
        }).sort({ 'offres_speciales.datedebut': 1 });
        offres.forEach(element => {
            element.offres_speciales = element.offres_speciales.filter(item => item.datedebut > date);
        });
        return offres;
    }
}

module.exports = Utilitaire;