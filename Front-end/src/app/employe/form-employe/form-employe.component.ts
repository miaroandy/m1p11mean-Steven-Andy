import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CallAPI } from '../../utilitaires/CallAPI';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Employe } from '../../model/Employe';
import { NgIf } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-employe',
  standalone: true,
  imports: [NzInputModule, NzTypographyModule,FormsModule, NzButtonModule, NzGridModule, NgIf, NzSpinModule],
  templateUrl: './form-employe.component.html',
  styleUrl: './form-employe.component.css',
})
export class FormEmployeComponent {
  employe: Employe =new Employe();
  loading=false;

  constructor(
    private callAPI: CallAPI,
    private router: Router
  ) { }

  onClick(){
    this.loading = true;
    this.callAPI.saveEmploye(this.employe).subscribe(
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
