import { Component, OnInit } from '@angular/core';
import { CallAPI } from '../utilitaires/CallAPI';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { SpinnerComponent } from '../component/spinner/spinner.component';
import { RendezVous } from '../model/RendezVous';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';


@Component({
    selector: 'home-service',
    templateUrl: './payement.component.html',
    standalone: true,
    imports: [NgFor, NgIf, SpinnerComponent,FormsModule, NzDatePickerModule,NzTypographyModule, CommonModule, NzSelectModule,NzModalModule],
    styleUrls: ['./payement.component.css']
})
export class PayementComponent implements OnInit {
    loading=true;
    rdv: RendezVous[]=[];
    isVisible=false;
    isOkLoading=false;
    idPayer="";
    num="";
    mode="";
    cvv="";
    expire="";
    
    constructor(
        private callAPI: CallAPI,
        private message: NzMessageService,
        private router: Router
    ) { }


    ngOnInit() {
        if (localStorage.getItem("role") !== 'client') {
            localStorage.clear();
            this.router.navigate(['/login/client']);
            return;
        }
        this.callAPI.servicePayement().subscribe(result => {
            this.rdv = result;
            this.loading = false;
        });
    }

    showModal(id: string): void {
        this.isVisible = true;
        this.idPayer=id;
    }

    handleOk(): void {
        this.isOkLoading = true;
        if(this.num=="" || this.mode=="" || this.cvv=="" || this.expire==""){
            this.isOkLoading=false;
            this.handleCancel();
            this.message.create('error', "Erreur, vous devez remplir tous les informations");
            return;
        }
        if(this.num.length!==16){
            this.isOkLoading = false;
            this.handleCancel();
            this.message.create('error', "Erreur, le numero de la carte doit comprendre 16 chiffres");
            return;
        }
        const dateJour=new Date();
        const dateExpire=new Date(this.expire);
        if(dateJour.getTime()>dateExpire.getTime()){
            this.isOkLoading = false;
            this.handleCancel();
            this.message.create('error', "Erreur, votre carte est expirée");
            return;
        }
        this.callAPI.payerRDV(this.idPayer).subscribe(result => {
            this.isOkLoading = false
            this.handleCancel();
            this.message.create('success', "Paiement effectué");
            this.ngOnInit();
        });
    }

    handleCancel(): void {
        this.isVisible = false;
        this.idPayer="";
    }

}
