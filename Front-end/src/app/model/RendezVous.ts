import { Client } from "./Client";
import { Employe } from "./Employe";
import { Service } from "./Service";

export class RendezVous {
    _id: string;
    date: Date;
    employe: Employe;
    service: Service;
    statut: number;
    client: Client;

    constructor() {
        this._id = '';
        this.date = new Date;
        this.employe = new Employe;
        this.statut = 0;
        this.service = new Service;
        this.client = new Client;
    }

    toJSON(): any {
        const { _id, ...autresAttributs } = this;
        return autresAttributs;
    }

}