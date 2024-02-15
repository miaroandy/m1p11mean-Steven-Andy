import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CallAPI } from '../../utilitaires/CallAPI';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Depense } from '../../model/Depense';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-depense',
  standalone: true,
  imports: [NzInputModule, NzTypographyModule, FormsModule, NzButtonModule, NzGridModule, NgIf, NzSpinModule],
  templateUrl: './form-depense.component.html',
  styleUrl: './form-depense.component.css'
})
export class FormDepenseComponent {
  depense: Depense = new Depense();
  loading = false;

  constructor(
    private callAPI: CallAPI,
    private router: Router
  ) { }

  onClick(){
    this.loading = true;
    this.callAPI.saveDepense(this.depense).subscribe(
      (data: any) => {
        this.router.navigate(['/employe/depense'])
        this.loading=false;
      },
      (error: any) => {
        // Gérez les erreurs ici
        console.error('Erreur', error);
      }
    );
  }
}
