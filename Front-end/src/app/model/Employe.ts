export class Employe {
    _id: number ;
    nom: string ;
    prenom: string ;
    email: string ;
    mot_de_passe: string ;

    constructor(
        _id: number, nom: string, prenom: string, email: string, mot_de_passe: string
    ) {
        this._id=_id;
        this.nom=nom;
        this.prenom=prenom;
        this.mot_de_passe=mot_de_passe;
        this.email=email;
    }

}