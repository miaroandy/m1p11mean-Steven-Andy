import { Component, OnInit } from '@angular/core';
import { CallAPI } from '../utilitaires/CallAPI';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
    selector: 'home-root',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [RouterModule],
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    loading = false;

    constructor(
        private callAPI: CallAPI,
        private router: Router,
    ) { }


    ngOnInit(): void {

    }

    
}
