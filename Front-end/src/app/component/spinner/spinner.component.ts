import { Component, Input, input } from '@angular/core';
import { NgIf } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
    selector: 'spinner-root',
    standalone: true,
    imports: [NgIf, NzSpinModule],
    templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
    @Input() loading=false;
    
    constructor() { }

}
