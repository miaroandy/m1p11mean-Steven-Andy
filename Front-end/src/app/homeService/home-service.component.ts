import { Component, OnInit } from '@angular/core';
import { CallAPI } from '../utilitaires/CallAPI';
import { SpinnerComponent } from '../component/spinner/spinner.component';
import { NgFor, NgIf } from '@angular/common';
import { Service } from '../model/Service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'home-service',
    templateUrl: './home-service.component.html',
    standalone: true,
    imports: [NgFor, NgIf, SpinnerComponent],
    styleUrls: ['./home-service.component.css']
})
export class HomeServiceComponent implements OnInit {
    loading = true;
    service: Service = new Service();
    id: string="";

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
}
