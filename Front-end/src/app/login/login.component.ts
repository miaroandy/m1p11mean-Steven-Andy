import { Component, OnInit } from "@angular/core";
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    standalone: true,
    imports: [NzFormModule, FormsModule, NzInputModule]
})
export class LoginComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
