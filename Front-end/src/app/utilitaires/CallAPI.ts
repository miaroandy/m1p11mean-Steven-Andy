import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from '../model/Employe';
import { Service } from '../model/Service';
import { Observable,tap,catchError,of } from 'rxjs';
import { Token } from '../model/Token';
import { Login } from '../model/Login';
import { Client } from '../model/Client';
import { Depense } from '../model/Depense';
import { Router } from '@angular/router';
import { RendezVous } from '../model/RendezVous';


@Injectable({
    providedIn: 'root',
})
export class CallAPI {
    apiUrl = 'https://salon-beaute-service.onrender.com/';
    //apiUrl = 'http://localhost:3000/';

    constructor(private http: HttpClient,
        private router: Router){ }

    getHistoriqueRDV():Observable<RendezVous[]>{
        const url = this.apiUrl + "rdv/historique/" + localStorage.getItem('identifiant');
        return this.http.get<RendezVous[]>(url).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, []))
        );
    }

    getFicheServiceSpecial(id: string): Observable<Service> {
        const url = this.apiUrl + "services/"+id+"/special";
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<Service>(url,{headers}).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, []))
        );
    }

    offresSpeciales(): Observable<Service[]> {
        const url = this.apiUrl + "services/offreSpecial";
        return this.http.get<Service[]>(url);
    }

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

    ajoutFavoris(favoris:any): any{
        const url = this.apiUrl + "users/favoris";
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post(url,favoris,{headers}).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, []))
        );
    }

    deleteFavoris(favoris: any): any {
        const url = this.apiUrl + "users/favoris/remove";
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post(url, favoris, { headers }).pipe(
            tap((response) => this.log(response)),
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

    profilUser(): Observable<Client>{
        const url = this.apiUrl + "client/" + localStorage.getItem('identifiant');
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<Client>(url,{headers}).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, []))
        );
    }

    private log(response: any) {
        console.table(response);
    }

    private handleError(error: HttpErrorResponse, errorValue: any) {
        if (error.error instanceof ErrorEvent) {
            console.error('Une erreur s\'est produite :', error.error.message);
        } else {
            if(error.status==401){
                this.router.navigate(['/login/client']);
            }
            console.error('Une erreur s\'est produite :', error.error.message);
        }

        return of(errorValue);
    }

    getAllServices(): Observable<Service[]> {
        const url = this.apiUrl + "services";
        return this.http.get<Service[]>(url);
    }

    getAllServicesHome(): Observable<Service[]> {
        const url = this.apiUrl + "services/home";
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

    getAllDepenses(): Observable<Depense[]> {
        const url = this.apiUrl + "depenses";
        return this.http.get<Depense[]>(url);
    }

    getDepenseById(id: string): Observable<Depense> {
        const url = this.apiUrl + "depenses/"+id;
        return this.http.get<Depense>(url).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, []))
        );
    }

    saveDepense(depense: Depense): any{
        const url = this.apiUrl + "depenses";
        return this.http.post(url, depense.toJSON());
    }
}
