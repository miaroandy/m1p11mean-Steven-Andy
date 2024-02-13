import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { CallAPI } from '../utilitaires/CallAPI';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'inscription-root',
    templateUrl: './inscription.component.html',
    standalone: true,
    imports: [NzFormModule, FormsModule, NgIf],
    styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
    

    ngOnInit(): void {
    }

    onClick() {
        
    }
}
