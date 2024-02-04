export class Service {
  _id: string;
  nom: string;
  prix: number;
  duree: number;
  taux_commission: number;
  offresSpeciales: OffreSpeciale[];

  constructor() {
    this._id = "";
    this.nom = '';
    this.prix = 0;
    this.duree = 0;
    this.taux_commission = 0;
    this.offresSpeciales = [];
  }

  toJSON(): any {
    const { _id, offresSpeciales, ...autresAttributs } = this;
    return {
      offresSpeciales: offresSpeciales.map(offre => offre.toJSON()),
      ...autresAttributs,
    };
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

  toJSON(): any {
    const { _id, ...autresAttributs } = this;
    return autresAttributs;
  }
}
