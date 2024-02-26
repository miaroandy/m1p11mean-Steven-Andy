import { Component, OnInit } from '@angular/core';
import { CallAPI } from '../utilitaires/CallAPI';
import { RendezVous } from '../model/RendezVous';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
    selector: 'rdv-employe',
    standalone: true,
    imports: [NzCalendarModule, NzBadgeModule],
    templateUrl: './rdv-employe.component.html',
    styleUrl: './rdv-employe.component.css',
    providers: []
})
export class RdvEmployeComponent implements OnInit {
    rdv: RendezVous[] =[];
    loading = true;

    constructor(private callAPI: CallAPI,
    ) { }

    ngOnInit() {
        this.callAPI.getRDVemploye().subscribe(result => {
            this.rdv = result;
            this.loading = false;
        });
    }
}
