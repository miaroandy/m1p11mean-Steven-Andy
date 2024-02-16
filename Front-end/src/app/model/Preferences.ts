import { Employe } from "./Employe";
import { Service } from "./Service";

export class Preferences {
    service: Service;
    employe: Employe;

    constructor() {
        this.service = new Service();
        this.employe = new Employe();
    }
}