import { Component, OnInit } from '@angular/core';
import { CallAPI } from '../utilitaires/CallAPI';
import { Client } from '../model/Client';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { CardServiceComponent } from '../component/service/cardService.component';
import { SpinnerComponent } from '../component/spinner/spinner.component';

@Component({
    selector: 'profil-root',
    standalone: true,
    imports: [NgIf, NzDescriptionsModule, CardServiceComponent, NgFor,SpinnerComponent],
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
    client: Client=new Client();
    loading=true;
    favoris=true;

    constructor(private callAPI: CallAPI,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = localStorage.getItem("identifiant");
        this.callAPI.profilUser(id).subscribe(result => {
            this.client = result;
            this.loading = false;
        });
    }

    onClick(status: boolean){
        this.favoris=status;
    }
    
}
