import { Component, OnInit } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CallAPI } from '../../utilitaires/CallAPI';
import { Service } from '../../model/Service';
import { ActivatedRoute } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgIf } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { OffreSpeciale } from '../../model/Service';


@Component({
    selector: 'app-fiche-service',
    standalone: true,
    imports: [NzTypographyModule, NzSpinModule, NgIf, NzCardModule, NzIconModule, NzGridModule],
    templateUrl: './fiche-service.component.html',
    providers: []
})
export class FicheServiceComponent implements OnInit {
    loading=true;
    service:Service=new Service();
    id:string='';
    offres: OffreSpeciale[] = [];

    constructor(private callAPI: CallAPI,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.id=this.route.snapshot.params['id'];
        this.callAPI.getServiceById(this.id).subscribe(result => {
            this.service = result;
            this.setOffres(this.service.offres_speciales);
            this.loading=false;
        });
    }

    setOffres(offresSpeciales: OffreSpeciale[]){
        this.offres = offresSpeciales;
    }
}
