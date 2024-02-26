const RendezVous = require('../models/RendezVous');
const Mail = require('./mail');

class Cron{

    static async getRdv(datenow){
        const rdv= await RendezVous.find({
            date: { $gt: datenow }
        }).populate([
            {
                path: 'service',
                select: '-photo'
            },
            {
                path:'client'
            }
        ]);
        return rdv;
    }

    static createHTMLBody(rdv){
        const formattedDateTime = rdv.date.toISOString().slice(0, 19).replace('T', ' ');
        const body = "<h2>Rappel de rendez-vous</h2><p>Cher(e) " + rdv.client.nom + " " + rdv.client.prenom + ",</p>      <p> Nous vous rappelons que vous avez un rendez-vous chez nous le " + formattedDateTime + " pour faire "+rdv.service.nom+"</p><p>Merci de bien vouloir se présenter ou de nous contacter si vous avez des questions ou si vous devez annuler ou reporter votre rendez-vous.</p>";
        return body;
    }

    static async createCron(){
        console.log("creation du cron");
        let datenow = new Date();
        const rdv = await Cron.getRdv(datenow);
        console.log(rdv);
        rdv.forEach(element => {
            if(element.date.getDate()-1 == datenow.getDate()){
                const mail=new Mail(element.client.email,'Rappel de rendez-vous')
                mail.sendMail(Cron.createHTMLBody(element));
            }
        });
    }
}

module.exports = Cron;