export class Depense {
    _id: string;
    // manager: ;
    salaire: number;
    loyer: number;
    achat_piece: number;
    autres_depenses: number;
    date: Date;

    constructor() {
        this._id = '';
        // this.manager = ;
        this.salaire = 0;
        this.loyer = 0;
        this.achat_piece = 0;
        this.autres_depenses = 0;
        this.date = new Date();
    }

    toJSON(): any {
        const { _id, ...autresAttributs } = this;
        return autresAttributs;
    }

}
