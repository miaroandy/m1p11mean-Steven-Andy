import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Login } from '../model/Login';
import { FormsModule } from '@angular/forms';
import { CallAPI } from '../utilitaires/CallAPI';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'nz-demo-form-normal-login',
    templateUrl: './login.component.html',
    standalone:true,
    imports: [NzFormModule, FormsModule,NgIf],
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    login: Login=new Login();
    loading=false;
    loginError=false;

    constructor(
        private callAPI: CallAPI,
        private router: Router
    ) { }


    ngOnInit(): void {
        this.login.role='employe';
    }

    erreur(){
        this.loginError = true;
        this.login.email = "";
        this.login.mdp = "";
        this.loading = false;
    }

    correct(){
        this.router.navigate(['/employe']);
    }


    onClick(){
        this.loading=true;
        this.callAPI.login(this.login).subscribe(
            (data: any) => {
                console.log(data)
                if(data.length==0){
                    this.erreur();
                }
                else{
                    this.correct();
                }
            },
            (error: any) => {
            }
        );
    }
}
