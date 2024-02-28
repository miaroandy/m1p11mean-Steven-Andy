import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Login } from '../model/Login';
import { FormsModule } from '@angular/forms';
import { CallAPI } from '../utilitaires/CallAPI';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'nz-demo-form-normal-login',
    templateUrl: './login.component.html',
    standalone:true,
    imports: [NzFormModule, FormsModule,NgIf,RouterModule],
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    login: Login=new Login();
    loading=false;
    loginError=false;
    etat=0;

    constructor(
        private callAPI: CallAPI,
        private router: Router,
        private route: ActivatedRoute
    ) { }


    ngOnInit(): void {
        this.login.role = this.route.snapshot.params['role'];
        if(this.login.role=='client'){
            this.login.email='ravaosoa@gmail.com';
            this.login.mdp='test';
            this.etat=1;
        }
        if (this.login.role == 'admin') {
            this.login.email = 'admin@gmail.com';
            this.login.mdp = 'admin';
            this.etat=2;
        }
        if (this.login.role == 'employe') {
            this.login.email = 'jeanpaul@gmail.com';
            this.login.mdp = 'jeanpaul';
            this.etat=3;
        }
    }

    erreur(){
        this.loginError = true;
        this.login.email = "";
        this.login.mdp = "";
        this.loading = false;
    }

    correct(){
        this.router.navigate(['/'+this.login.role]);
    }


    onClick(){
        this.loading=true;
        this.callAPI.login(this.login,this.etat).subscribe(
            (data: any) => {
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
    
    home(){
        this.router.navigate(['']);
    }
}
