import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Router, RouterOutlet } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgIf } from '@angular/common';


@Component({
    selector: 'template-client',
    standalone: true,
    imports: [RouterOutlet, NzCardModule, NzTypographyModule, NzLayoutModule, NzPageHeaderModule, NzMenuModule, NzIconModule, NgIf],
    templateUrl: './templateClient.component.html',
    styleUrls: ['./templateClient.component.css']
})
export class TemplateClientComponent implements OnInit{
    estConnecte:boolean=false;

    constructor(private router: Router){}

    ngOnInit(): void {
        if(localStorage.getItem("role")=='client'){
            this.estConnecte=true;
        }
    }

    navigate(lien:string){
        this.router.navigate([lien]);
    }

    seDeconnecter(){
        localStorage.clear();
        this.router.navigate(['login/client']);
    }
}
