export class Service {
  _id: string;
  nom: string;
  prix: number;
  duree: number;
  taux_commission: number;
  photo: string;
  offres_speciales: OffreSpeciale[];

  constructor() {
    this._id = '';
    this.nom = '';
    this.prix = 0;
    this.duree = 0;
    this.photo = '';
    this.taux_commission = 0;
    this.offres_speciales = [];
  }

  toJSON(): any {
    const { _id, ...autresAttributs } = this;
    return autresAttributs;
  }
}

export class OffreSpeciale {
  _id: string;
  datedebut: Date;
  datefin: Date;
  reduction: number;

  constructor() {
    this._id = '';
    this.datedebut = new Date();
    this.datefin = new Date();
    this.reduction = 0;
  }
}
