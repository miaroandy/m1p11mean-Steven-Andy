import { Component, OnInit } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CallAPI } from '../../utilitaires/CallAPI';
import { Depense } from '../../model/Depense';
import { ActivatedRoute } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CommonModule, NgIf } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';


@Component({
    selector: 'app-fiche-depense',
    standalone: true,
    imports: [NzTypographyModule, NzSpinModule, NgIf, NzCardModule, NzIconModule, NzGridModule,CommonModule],
    templateUrl: './fiche-depense.component.html',
    providers: []
})
export class FicheDepenseComponent implements OnInit {
    loading=true;
    depense:Depense=new Depense();
    id:string='';
    // manager: 

    constructor(private callAPI: CallAPI,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.id=this.route.snapshot.params['id'];
        this.callAPI.getDepenseById(this.id).subscribe(result => {
            this.depense = result;
            this.loading=false;
        });
    }
}
