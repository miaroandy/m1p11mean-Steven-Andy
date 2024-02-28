import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CallAPI } from '../utilitaires/CallAPI';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RendezVous } from '../model/RendezVous';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
    selector: 'tache-suivi',
    standalone: true,
    imports: [NzTableModule, NzTypographyModule, NgFor, NgIf, NzSpinModule, CommonModule, NzModalModule, NzButtonModule],
    templateUrl: './tache.component.html',
    providers: []
})
export class TacheEmployeComponent implements OnInit {
    rdv: RendezVous[] = [];
    nbrRdv: number = 0;
    loading = true;
    isVisible=false;
    date: Date| null=null;
    commission: number=0;

    constructor(private callAPI: CallAPI
    ) { }

    ngOnInit() {
        this.callAPI.getTacheEffectuee().subscribe(result => {
            this.rdv = result;
            this.nbrRdv = this.rdv.length;
            this.loading = false;
        });
    }

    compareDate(d1: Date, d2: Date): boolean{
        const date1=new Date(d1+"");
        const date2=new Date(d2+"");
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }

    showModal(date: Date) {
        this.date=date;
        this.rdv.forEach(element => {
           if(this.compareDate(element.date,date)){
               this.commission = this.commission + (element.service.prix * element.service.taux_commission);
           } 
        });
        this.isVisible = true;
    }

    handleOk(): void {
        this.date=null;
        this.commission=0;
        this.isVisible = false;
    }

}
