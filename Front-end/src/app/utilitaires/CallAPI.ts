import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from '../model/Employe';
import { Service } from '../model/Service';
import { Observable,tap,catchError,of } from 'rxjs';
import { Token } from '../model/Token';
import { Login } from '../model/Login';
import { Client } from '../model/Client';


@Injectable({
    providedIn: 'root',
})
export class CallAPI {
    apiUrl = 'https://salon-beaute-service.onrender.com/';
    //apiUrl = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    login(user: Login): Observable<Token>{
        const url = this.apiUrl + "login";
        return this.http.post<Token>(url,user).pipe(
            tap((response) => {
                localStorage.setItem('token',response.token);
                localStorage.setItem('identifiant',response.identifiant);
                localStorage.setItem('role',response.role);
            }),
            catchError((error) => this.handleError(error, []))
        );
    }

    inscription(client: Client): Observable<Client>{
        const url = this.apiUrl + "login/inscription";
        return this.http.post<Client>(url, client).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, []))
        );
    }

    getAllEmployes(): Observable<Employe[]> {
        const url=this.apiUrl+"employe";
        return this.http.get<Employe[]>(url).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, []))
        );
    }

    getEmployeById(id: string): Observable<Employe> {
        const url = this.apiUrl + "employe/"+id;
        return this.http.get<Employe>(url).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, []))
        );
    }

    saveEmploye(employe: Employe): Observable<string>{
        const url=this.apiUrl+"employe";
        return this.http.post<string>(url, employe.toJSON()).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, []))
        );
    }

    private log(response: any) {
        console.table(response);
    }

    private handleError(error: Error, errorValue: any) {
        console.error(error);
        return of(errorValue);
    }

    getAllServices(): Observable<Service[]> {
        const url = this.apiUrl + "services";
        return this.http.get<Service[]>(url);
    }

    getServiceById(id: string): Observable<Service> {
        const url = this.apiUrl + "services/"+id;
        return this.http.get<Service>(url).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, []))
        );
    }

    saveService(service: Service): any{
        const url = this.apiUrl + "services";
        return this.http.post(url, service.toJSON());
    }
}
