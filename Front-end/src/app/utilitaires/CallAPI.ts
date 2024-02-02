import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from '../model/Employe';
import { Observable } from 'rxjs';


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
}