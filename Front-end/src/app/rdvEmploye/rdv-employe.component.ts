import { Component, OnInit } from '@angular/core';
import { CallAPI } from '../utilitaires/CallAPI';
import { RendezVous } from '../model/RendezVous';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { SpinnerComponent } from '../component/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector: 'rdv-employe',
    standalone: true,
    imports: [NzCalendarModule, NzBadgeModule, SpinnerComponent, NgIf, NzTypographyModule, NzModalModule, NzButtonModule],
    templateUrl: './rdv-employe.component.html',
    styleUrl: './rdv-employe.component.css',
    providers: []
})
export class RdvEmployeComponent implements OnInit {
    rdv: RendezVous[] =[];
    loading = true;
    isVisible = false;
    isConfirmLoading=false;
    detailsRDV: RendezVous| undefined=new RendezVous();

    constructor(private callAPI: CallAPI,
    ) { }

    ngOnInit() {
        this.callAPI.getRDVemploye().subscribe(result => {
            this.rdv = result;
            this.loading = false;
        });
    }

    memeDate(date1: Date,date: Date){
        const date2=new Date(""+date);
        if (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()){
            return true;
        }
        return false;
    }

    getHeure(date1: Date|undefined){
        const date=new Date(""+date1);
        let heure = date.getHours(); 
        let minutes = date.getMinutes().toString();
        if(minutes.length==1)
            minutes="0"+minutes;
        return heure+"h "+minutes;
    }

    showModal(id: string){
        this.isVisible=true;
        this.detailsRDV= this.rdv.find(element => element._id==id);
    }

    handleCancel(): void {
        this.isVisible = false;
    }

    handleOk(id: string|undefined): void {
        if(id){
            this.isConfirmLoading = true;
            this.callAPI.finirRDV(id).subscribe(result => {
                if (this.detailsRDV){
                    this.detailsRDV.statut=2;
                }
                this.isConfirmLoading = false;
                this.isVisible = false;
            }); 
        }
    }
}
