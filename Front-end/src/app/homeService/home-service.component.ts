import { Component, Input, OnInit } from '@angular/core';
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

@Component({
    selector: 'home-service',
    templateUrl: './home-service.component.html',
    standalone: true,
    imports: [NgFor, NgIf, SpinnerComponent, NzTypographyModule, NzModalModule, NzRadioModule, FormsModule, NzButtonModule],
    styleUrls: ['./home-service.component.css']
})
export class HomeServiceComponent implements OnInit {
    loading = true;
    loadingEmp=true;
    service: Service = new Service();
    id: string="";
    isVisible = false;
    isOkLoading = false;
    employes: Employe[]=[];
    radioValue: string="";

    constructor(
        private callAPI: CallAPI,
        private route: ActivatedRoute
    ) { }


    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.callAPI.getFicheServiceSpecial(this.id).subscribe(result => {
            this.service = result;
            this.loading = false;
        });
    }

    showModal(): void {
        this.isVisible = true;
        this.callAPI.getAllEmployes().subscribe(result => {
            this.employes = result;
            this.loadingEmp = false;
        });
    }

    handleOk(): void {
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

    handleCancel(): void {
        this.isVisible = false;
    }
}
