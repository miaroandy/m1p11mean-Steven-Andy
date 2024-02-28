import { Component, Input } from '@angular/core';
import { Service } from '../../model/Service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
    selector: 'promotion-service',
    standalone: true,
    imports: [NgIf, CommonModule],
    templateUrl: './promotion.component.html',
    styleUrls: ['./promotion.component.css']
})
export class PromotionServiceComponent {
    @Input() service: Service = new Service;

    constructor() { }

}
