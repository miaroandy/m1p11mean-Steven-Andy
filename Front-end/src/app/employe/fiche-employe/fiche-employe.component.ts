import { Component, OnInit } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CallAPI } from '../../utilitaires/CallAPI';
import { Employe } from '../../model/Employe';
import { ActivatedRoute } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgIf } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';


@Component({
    selector: 'app-fiche-employe',
    standalone: true,
    imports: [NzTypographyModule, NzSpinModule, NgIf, NzCardModule, NzIconModule, NzGridModule],
    templateUrl: './fiche-employe.component.html',
    providers: []
})
export class FicheEmployeComponent implements OnInit {
    loading=true;
    employe:Employe=new Employe();
    id:string='';
    
    constructor(private callAPI: CallAPI,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.id=this.route.snapshot.params['id'];
        this.id ="65bb74dda07e2e10fcb3b57d";
        this.callAPI.getEmployeById(this.id).subscribe(result => {
            this.employe = result;
            this.loading=false;
        });
    }
}
