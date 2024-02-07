import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employe } from '../model/Employe';
import { Service } from '../model/Service';
import { Observable,tap,catchError,of } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class CallAPI {
    apiUrl = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

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

    saveService(service: Service): any{
        const url = this.apiUrl + "services";
        return this.http.post(url, service.toJSON());
    }
}
