export class Manager {
    _id: string ;
    nom: string ;
    prenom: string ;
    email: string ;
    mot_de_passe: string ;

    constructor() {
        this._id= '';
        this.nom='';
        this.prenom='';
        this.mot_de_passe='';
        this.email='';
    }

    toJSON(): any {
        const { _id, ...autresAttributs } = this;
        return autresAttributs;
    }

}
