import { Component, OnInit } from '@angular/core';
import { CallAPI } from '../utilitaires/CallAPI';
import { RouterModule } from '@angular/router';
import { CardServiceComponent } from '../component/service/cardService.component';
import { Service } from '../model/Service';
import { NgFor, NgIf } from '@angular/common';
import { SpinnerComponent } from '../component/spinner/spinner.component';


@Component({
    selector: 'home-root',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [RouterModule, CardServiceComponent, NgFor,NgIf,SpinnerComponent],
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    loading = true;
    services: Service[] = [];

    constructor(
        private callAPI: CallAPI
    ) { }


    ngOnInit() {
        this.callAPI.getAllServices().subscribe(result => {
            this.services = result;
            this.loading = false;
        });
    }

    
}
