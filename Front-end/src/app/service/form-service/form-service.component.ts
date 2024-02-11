import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CallAPI } from '../../utilitaires/CallAPI';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Service } from '../../model/Service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-service',
  standalone: true,
  imports: [NzInputModule, NzTypographyModule, FormsModule, NzButtonModule, NzGridModule, NgIf, NzSpinModule],
  templateUrl: './form-service.component.html',
  styleUrl: './form-service.component.css'
})
export class FormServiceComponent {
  service: Service = new Service();
  loading = false;

  constructor(
    private callAPI: CallAPI,
    private router: Router
  ) { }

  onClick(){
    this.loading = true;
    this.callAPI.saveService(this.service).subscribe(
      (data: any) => {
        this.router.navigate(['/employe'])
        this.loading=false;
      },
      (error: any) => {
        // Gérez les erreurs ici
        console.error('Erreur', error);
      }
    );
  }
}
