import { Component, Input } from '@angular/core';
import { Service } from '../../model/Service';
import { Employe } from '../../model/Employe';
import { CommonModule, NgIf } from '@angular/common';

@Component({
    selector: 'card-service',
    standalone: true,
    imports: [NgIf,CommonModule],
    templateUrl: './cardService.component.html',
    styleUrls: ['./cardService.component.css']
})
export class CardServiceComponent{
    @Input() service: Service= new Service;
    @Input() employe: Employe=new Employe;

    constructor() { }

}
