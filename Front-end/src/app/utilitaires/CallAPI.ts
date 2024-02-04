import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from '../model/Employe';
import { Observable } from 'rxjs';
import { Service } from '../model/Service';


@Injectable({
    providedIn: 'root',
})
export class CallAPI {
    apiUrl = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    getAllEmployes(): Observable<Employe[]> {
        const url=this.apiUrl+"employe";
        return this.http.get<Employe[]>(url);
    }

    saveEmploye(employe: Employe): any{
        const url=this.apiUrl+"employe";
        return this.http.post(url,employe.toJSON());
    }

    getAllServices(): Observable<Service[]> {
        const url = this.apiUrl + "services";
        return this.http.get<Service[]>(url);
    }

    saveService(service: Service): any{
        const url = this.apiUrl + "services";
        return this.http.post(url, service.toJSON());
    }
}
