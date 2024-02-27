import { Component, OnInit } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CallAPI } from '../../utilitaires/CallAPI';
import { Employe } from '../../model/Employe';
import { ActivatedRoute, Router } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgIf } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { HoraireTravail } from '../../model/HoraireTravail';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'profil-employe',
    standalone: true,
    imports: [NzTypographyModule,FormsModule, NzSpinModule, NzTimePickerModule, NgIf, NzCardModule, NzModalModule,NzIconModule, NzGridModule, NzButtonModule],
    templateUrl: './profil-employe.component.html',
    styleUrl: './profil-employe.component.css',
    providers: []
})
export class ProfilEmployeComponent implements OnInit {
    loading = true;
    employe: Employe = new Employe();
    id: string|null = '';
    horaire: Map<string, string> = new Map();
    isVisible=false;
    isConfirmLoading=false;
    debut: Date | null = null;
    fin: Date | null = null;
    jour: string='';

    constructor(private callAPI: CallAPI,
        private router: Router
    ) { }

    ngOnInit() {
        if(localStorage.getItem("role")!=='employe'){
            localStorage.clear();
            this.router.navigate(['/login/employe']);
            return;
        }
        this.id = localStorage.getItem("identifiant");
        if(this.id){
            this.callAPI.getEmployeById(this.id).subscribe(result => {
                this.employe = result;
                this.setHoraire(this.employe.horaires_travail);
                this.loading = false;
            });
        }
    }

    
    setHoraire(horairedetravail: HoraireTravail[]) {
        for (let index = 0; index < horairedetravail.length; index++) {
            const element = horairedetravail[index];
            const s = "De " + element.heure_debut + " à " + element.heure_fin;
            this.horaire.set(element.jour, s);
        }
    }

    showModal(jour: string) {
        this.jour=jour;
        this.isVisible = true;
    }

    handleCancel(): void {
        this.isVisible = false;
    }

    dateToTime(date: Date|null){
        let heure=""+date?.getHours();
        let minute=""+date?.getMinutes();
        if(heure.length==1){
            heure="0"+heure;
        }
        if(minute.length==1){
            minute="0"+minute;
        }
        return heure+":"+minute;
    }

    handleOk(etat:number): void {
        this.isConfirmLoading = true;
        if(etat==1){
            const horaire={
                debut: this.dateToTime(this.debut),
                fin: this.dateToTime(this.fin),
                jour: this.jour
            }
            this.callAPI.majHoraireTravail(horaire).subscribe(result => {
                this.isConfirmLoading = false;
                this.isVisible = false;
                this.horaire.set(this.jour, "De " + horaire.debut + " à " + horaire.fin);
            });
        }
        if (etat == 2) {
            const horaire = {
                jour: this.jour
            }
            this.callAPI.deleteHoraireTravail(horaire).subscribe(result => {
                this.isConfirmLoading = false;
                this.isVisible = false;
                this.horaire.delete(this.jour);
            });
        }
    }
}
