import { Component, OnInit } from '@angular/core';
import { CallAPI } from '../utilitaires/CallAPI';
import { Router, RouterModule } from '@angular/router';
import { CardServiceComponent } from '../component/service/cardService.component';
import { Service } from '../model/Service';
import { NgFor, NgIf } from '@angular/common';
import { SpinnerComponent } from '../component/spinner/spinner.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';


@Component({
    selector: 'home-root',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [RouterModule, CardServiceComponent, NgFor, NgIf, SpinnerComponent, NzCarouselModule],
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    loading = true;
    loadingOffres= true;
    services: Service[] = [];
    offresSpecial: Service[]= [];

    constructor(
        private callAPI: CallAPI,
        private router: Router
    ) { }


    ngOnInit() {
        this.callAPI.getAllServicesHome().subscribe(result => {
            this.services = result;
            this.loading = false;
        });
        this.callAPI.offresSpeciales().subscribe(result => {
            this.offresSpecial = result;
            this.loadingOffres = false;
        });
    }

    navigate(id:string){
        this.router.navigate(['/client/service',id]);
    }

    
}
