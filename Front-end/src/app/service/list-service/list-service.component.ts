import { Component, OnInit } from '@angular/core';
import { Service } from '../../model/Service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule, NgFor,NgIf } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CallAPI } from '../../utilitaires/CallAPI';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-list-service',
  standalone: true,
  imports: [NzTableModule, NzTypographyModule, NgFor, NgIf, NzSpinModule, NzButtonModule,RouterLink, CommonModule, FormsModule, NzButtonModule, NzInputModule],
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.css',
  providers: []
})
export class ListServiceComponent implements OnInit {
  services: Service[] = [];
  nbrServices: number = 0;
  loading=true;
  filterParams = { nom: '', prixMin: null, prixMax: null, taux_commission: null, dureeMin: null, dureeMax: null };

  constructor(private callAPI: CallAPI,
    private router: Router
  ) { }

  ngOnInit() {
    this.callAPI.getAllServices().subscribe(result => {
      this.services = result;
      if (this.services) {
        this.nbrServices = this.services.length;
      } else {
        this.nbrServices = 0;
      }
      this.loading=false;
    });
  }

  onClick(id: string){
    this.router.navigate(['/service', id])
  }

  filterServices(): void {
    this.loading = true;
    this.callAPI.getFilteredServices(this.filterParams).subscribe(result => {
      this.services = result;
      if (this.services) {
        this.nbrServices = this.services.length;
      } else {
        this.nbrServices = 0;
      }
      this.loading = false;
      console.log(this.services)
    });
  }

  onReset(): void {
    this.filterParams = { nom: '', prixMin: null, prixMax: null, taux_commission: null, dureeMin: null, dureeMax: null };
  }
}
