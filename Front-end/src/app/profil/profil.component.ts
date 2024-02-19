import { Component, OnInit } from '@angular/core';
import { CallAPI } from '../utilitaires/CallAPI';
import { Client } from '../model/Client';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { CardServiceComponent } from '../component/service/cardService.component';
import { SpinnerComponent } from '../component/spinner/spinner.component';
import { RendezVous } from '../model/RendezVous';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

@Component({
    selector: 'profil-root',
    standalone: true,
    imports: [NgIf, NzDescriptionsModule, CardServiceComponent, NgFor, SpinnerComponent, NzTimelineModule,CommonModule],
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
    client: Client=new Client();
    rdv: RendezVous[]=[];
    loading=true;
    favoris=true;

    constructor(private callAPI: CallAPI,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.callAPI.profilUser().subscribe(result => {
            this.client = result;
            this.loading = false;
        });
        this.callAPI.getHistoriqueRDV().subscribe(result => {
            this.rdv = result;
        });
    }

    onClick(status: boolean){
        this.favoris=status;
    }
    
}
