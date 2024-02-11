import { Component, OnInit } from '@angular/core';
import { Service } from '../../model/Service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgFor,NgIf } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CallAPI } from '../../utilitaires/CallAPI';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-service',
  standalone: true,
  imports: [NzTableModule, NzTypographyModule, NgFor, NgIf, NzSpinModule, NzButtonModule],
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.css',
  providers: []
})
export class ListServiceComponent implements OnInit {
  services: Service[] = [];
  nbrServices: number = 0;
  loading=true;

  constructor(private callAPI: CallAPI,
    private router: Router
  ) { }

  ngOnInit() {
    this.callAPI.getAllServices().subscribe(result => {
      this.services = result;
      this.nbrServices = this.services.length;
      this.loading=false;
    });
  }

  onClick(id: string){
    this.router.navigate(['/service', id])
  }
}
