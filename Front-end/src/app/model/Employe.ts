import { HoraireTravail } from "./HoraireTravail";

export class Employe {
    _id: string ;
    nom: string ;
    prenom: string ;
    email: string ;
    mot_de_passe: string ;
    horaires_travail: HoraireTravail[];

    constructor() {
        this._id= '';
        this.nom='';
        this.prenom='';
        this.mot_de_passe='';
        this.email='';
        this.horaires_travail=[];
    }

    toJSON(): any {
        const { _id, ...autresAttributs } = this;
        return autresAttributs;
    }

}