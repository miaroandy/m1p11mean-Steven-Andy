import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root', // ou vous pouvez spécifier un module particulier si nécessaire
})
export class CallAPI {
    apiUrl = 'http://localhost:3000/'; 

    constructor(private http: HttpClient) { }

    // Méthode pour effectuer la requête HTTP GET
    getAllEmployes() {
        const url=this.apiUrl+"employe";
        return this.http.get(url);
    }
}