import { Component, OnInit } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CallAPI } from '../../utilitaires/CallAPI';
import { Employe } from '../../model/Employe';
import { ActivatedRoute } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgIf } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HoraireTravail } from '../../model/HoraireTravail';


@Component({
    selector: 'app-fiche-employe',
    standalone: true,
    imports: [NzTypographyModule, NzSpinModule, NgIf, NzCardModule, NzIconModule, NzGridModule],
    templateUrl: './fiche-employe.component.html',
    providers: []
})
export class FicheEmployeComponent implements OnInit {
    loading=true;
    employe:Employe=new Employe();
    id:string='';
    horaire: Map<string,string>=new Map(); 
    
    constructor(private callAPI: CallAPI,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.id=this.route.snapshot.params['id'];
        this.callAPI.getEmployeById(this.id).subscribe(result => {
            this.employe = result;
            this.setHoraire(this.employe.horaires_travail);
            this.loading=false;
        });
    }

    setHoraire(horairedetravail: HoraireTravail[]){
        for (let index = 0; index < horairedetravail.length; index++) {
            const element = horairedetravail[index];
            const s="De "+element.heure_debut+" à "+element.heure_fin;
            this.horaire.set(element.jour,s);
        }
    }
}
