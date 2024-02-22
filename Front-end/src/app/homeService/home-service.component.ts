import { Component, OnInit } from '@angular/core';
import { CallAPI } from '../utilitaires/CallAPI';
import { SpinnerComponent } from '../component/spinner/spinner.component';
import { NgFor, NgIf } from '@angular/common';
import { Service } from '../model/Service';
import { ActivatedRoute } from '@angular/router';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { Employe } from '../model/Employe';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'home-service',
    templateUrl: './home-service.component.html',
    standalone: true,
    imports: [NgFor, NgIf, NzMessageModule, SpinnerComponent, NzTypographyModule, NzModalModule, NzRadioModule, FormsModule, NzButtonModule, NzDatePickerModule],
    styleUrls: ['./home-service.component.css']
})
export class HomeServiceComponent implements OnInit {
    loading = true;
    loadingEmp=true;
    loadingEmpLibre=false;
    apresDate=false;
    service: Service = new Service();
    id: string="";
    isVisible = false;
    isVisibleRdv=false;
    isOkLoading = false;
    employes: Employe[]=[];
    radioValue: string="";
    dateRdv: string="";

    constructor(
        private callAPI: CallAPI,
        private route: ActivatedRoute,
        private message: NzMessageService
    ) { }


    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.callAPI.getFicheServiceSpecial(this.id).subscribe(result => {
            this.service = result;
            this.loading = false;
        });
    }

    showModal(value: number): void {
        if(value==1){
            this.isVisible = true;
            this.callAPI.getAllEmployes().subscribe(result => {
                this.employes = result;
                this.loadingEmp = false;
            });
        }
        if(value==2){
            this.isVisibleRdv =true;
            this.apresDate=false;
            this.employes=[];
        }
    }

    handleOk(value:number): void {
        if(value==1){
            this.isOkLoading = true;
            const favoris={
                id: localStorage.getItem("identifiant"),
                service: this.id,
                employe: this.radioValue
            }
            this.callAPI.ajoutFavoris(favoris).subscribe(() => {
                this.isVisible = false;
                this.isOkLoading = false;
            });
        }
        if(value==2){
            if(this.radioValue==""){
                this.handleCancel();
                this.message.create('error', "Votre rendez-vous n'est pas pris en compte");
            }
            this.isOkLoading = true;
            const rdv={
                date: this.formaterDate(),
                employe: this.radioValue,
                service: this.id,
                client: localStorage.getItem("identifiant"),
                statut: 0
            }
            this.callAPI.ajoutRDV(rdv).subscribe(() => {
                this.isVisibleRdv = false;
                this.isOkLoading = false;
            });
        }
    }

    handleCancel(): void {
        this.isVisible = false;
        this.isVisibleRdv=false;
    }

    onChange(): void{
        this.loadingEmpLibre=true;
        const dateFormatee=this.formaterDate();
        console.log(dateFormatee);
        this.callAPI.employeLibre(dateFormatee).subscribe(result => {
            this.employes=result;
            this.loadingEmpLibre=false;
            this.apresDate=true;
        });
    }

    formaterDate():string{
        let dateOrigine = new Date(this.dateRdv);
        let annee = dateOrigine.getFullYear();
        let mois = ('0' + (dateOrigine.getMonth() + 1)).slice(-2);
        let jour = ('0' + dateOrigine.getDate()).slice(-2);
        let heures = ('0' + dateOrigine.getHours()).slice(-2);
        let minutes = ('0' + dateOrigine.getMinutes()).slice(-2);
        let secondes = ('0' + dateOrigine.getSeconds()).slice(-2);
        const dateFormatee = `${annee}-${mois}-${jour}T${heures}:${minutes}:${secondes}`;
        return dateFormatee;
    }

}
