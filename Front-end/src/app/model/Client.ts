export class Client {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    numero:string;
    mot_de_passe: string;

    constructor() {
        this._id = '';
        this.nom = '';
        this.prenom = '';
        this.mot_de_passe = '';
        this.email = '';
        this.numero='';
    }

    toJSON(): any {
        const { _id, ...autresAttributs } = this;
        return autresAttributs;
    }

}