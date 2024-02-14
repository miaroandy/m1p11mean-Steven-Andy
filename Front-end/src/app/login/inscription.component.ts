import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { CallAPI } from '../utilitaires/CallAPI';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { Client } from '../model/Client';

@Component({
    selector: 'inscription-root',
    templateUrl: './inscription.component.html',
    standalone: true,
    imports: [NzFormModule, FormsModule, NgIf,RouterModule],
    styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
    loading=false;
    error=false;
    client: Client=new Client();

    constructor(
        private callAPI: CallAPI,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    onClick() {
        this.loading = true;
        this.callAPI.inscription(this.client).subscribe(
            (data: any) => {
                this.router.navigate(['/login/client']);
            },
            (error: any) => {
                this.error = true;
                this.loading = false;
            }
        );
    }
}
