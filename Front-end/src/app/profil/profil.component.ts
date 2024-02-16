import { Component, OnInit } from '@angular/core';
import { CallAPI } from '../utilitaires/CallAPI';
import { Client } from '../model/Client';
import { Router } from '@angular/router';

@Component({
    selector: 'profil-root',
    standalone: true,
    imports: [],
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
    client: Client=new Client();
    loading=false;

    constructor(private callAPI: CallAPI,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loading=true;
        const id = localStorage.getItem("identifiant");
        this.callAPI.profilUser(id).subscribe(result => {
            this.client = result;
            this.loading = false;
        });
    }
    
}
