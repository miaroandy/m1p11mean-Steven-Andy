import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from '../model/Employe';
import { OffreSpeciale, Service } from '../model/Service';
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
    //apiUrl = 'https://salon-beaute-service.onrender.com/';
    apiUrl = 'http://localhost:3000/';

    constructor(private http: HttpClient,
        private router: Router){ }

    getHistoriqueRDV():Observable<RendezVous[]>{
        const url = this.apiUrl + "rdv/historique/" + localStorage.getItem('identifiant');
        return this.http.get<RendezVous[]>(url).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [],1))
        );
    }

    getRDVemploye():Observable<RendezVous[]>{
        const url= this.apiUrl + "rdv/employe/"+ localStorage.getItem('identifiant');
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<RendezVous[]>(url, { headers }).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [], 3))
        );
    }

    finirRDV(id: string):Observable<string>{
        const url = this.apiUrl + "rdv/"+id+"/finir";
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<string>(url, { headers }).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [], 3))
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
            catchError((error) => this.handleError(error, [],1))
        );
    }

    servicePayement(): Observable <RendezVous[]>{
        const url = this.apiUrl + "payement/" + localStorage.getItem("identifiant");
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<RendezVous[]>(url, { headers }).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [],1))
        );
    }

    payerRDV(id:string):Observable<RendezVous>{
        const url = this.apiUrl + "payement/payer/" + id;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<RendezVous>(url, { headers }).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [],1))
        );
    }

    employeLibre(date: string): Observable<Employe[]> {
        const url = this.apiUrl + "rdv/employeLibre";
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        const body={
            date: date
        }
        return this.http.post<Employe[]>(url, body ,{ headers }).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [],1))
        );
    }

    majHoraireTravail(horaire: any):Observable<string>{
        const url = this.apiUrl + "employe/"+localStorage.getItem("identifiant")+"/horaire";
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<string>(url, horaire, { headers }).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [], 3))
        );
    }

    deleteHoraireTravail(horaire: any):Observable<string>{
        const url = this.apiUrl + "employe/" + localStorage.getItem("identifiant") + "/horaire/delete";
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<string>(url, horaire, { headers }).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [], 3))
        );
    }

    ajoutRDV(rdv: any): Observable<RendezVous> {
        const url = this.apiUrl + "rdv";
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<RendezVous>(url, rdv, { headers }).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [],1))
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
            catchError((error) => this.handleError(error, [],1))
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
            catchError((error) => this.handleError(error, [],1))
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
            catchError((error) => this.handleError(error, [],1))
        );
    }

    inscription(client: Client): Observable<Client>{
        const url = this.apiUrl + "login/inscription";
        return this.http.post<Client>(url, client).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [],1))
        );
    }

    getAllEmployes(): Observable<Employe[]> {
        const url=this.apiUrl+"employe";
        return this.http.get<Employe[]>(url).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [],2))
        );
    }

    getEmployeById(id: string): Observable<Employe> {
        const url = this.apiUrl + "employe/"+id;
        return this.http.get<Employe>(url).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [],2))
        );
    }

    saveEmploye(employe: Employe): Observable<string>{
        const url=this.apiUrl+"employe";
        return this.http.post<string>(url, employe.toJSON()).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [],2))
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
            catchError((error) => this.handleError(error, [],1))
        );
    }

    private log(response: any) {
        console.table(response);
    }

    private handleError(error: HttpErrorResponse, errorValue: any, route:number) {
        if (error.error instanceof ErrorEvent) {
            console.error('Une erreur s\'est produite :', error.error.message);
        } else {
            if(error.status==401){
                if(route==1){
                    this.router.navigate(['/login/client']);
                }
                if(route==2){
                    this.router.navigate(['/login/admin']);
                }
                if (route==3) {
                    this.router.navigate(['/login/employe']);
                }
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
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<Service>(url,{headers}).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [],2))
        );
    }

    saveService(service: Service): any{
        const url = this.apiUrl + "services";
        return this.http.post(url, service.toJSON());
    }

    saveOffre(idservice: string, offre: OffreSpeciale): any{
        const url = this.apiUrl + "services/" + idservice + "/offreSpeciale";
        return this.http.post(url, offre.toJSON());
    }

    getAllDepenses(): Observable<Depense[]> {
        const url = this.apiUrl + "depenses";
        return this.http.get<Depense[]>(url);
    }

    getDepenseById(id: string): Observable<Depense> {
        const url = this.apiUrl + "depenses/"+id;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<Depense>(url,{headers}).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [],2))
        );
    }

    saveDepense(depense: Depense): any{
        const url = this.apiUrl + "depenses";
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post(url, depense.toJSON(),{headers}).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [], 2))
        );
    }

    getTempsTravailMoyen(): Observable<any[]> {
      const url = this.apiUrl + 'stats/temps-travail';
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any[]>(url,{headers}).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [], 2))
        );
    }

    getReservationsParMois(): Observable<any[]> {
      const url = this.apiUrl + 'stats/reservations-mois';
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any[]>(url,{headers}).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [], 2))
        );
    }

    getReservationsParJour(): Observable<any[]> {
      const url = this.apiUrl + 'stats/reservations-jour';
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any[]>(url,{headers}).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [], 2))
        );
    }

    getChiffreAffairesParMois(): Observable<any[]> {
      const url = this.apiUrl + 'stats/chiffre-affaires-mois';
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any[]>(url,{headers}).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [], 2))
        );
    }

    getChiffreAffairesParJour(): Observable<any[]> {
      const url = this.apiUrl + 'stats/chiffre-affaires-jour';
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any[]>(url,{headers}).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [], 2))
        );
    }

    getBeneficeParMois(): Observable<any[]> {
      const url = this.apiUrl + 'stats/benefice-mois';
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any[]>(url,{headers}).pipe(
            tap((response) => this.log(response)),
            catchError((error) => this.handleError(error, [], 2))
        );
    }
}
