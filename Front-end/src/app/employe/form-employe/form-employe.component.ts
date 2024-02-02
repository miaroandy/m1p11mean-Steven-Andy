import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CallAPI } from '../../utilitaires/CallAPI';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Employe } from '../../model/Employe';
import { Router } from '@angular/router';



@Component({
  selector: 'app-form-employe',
  standalone: true,
  imports: [NzInputModule, FormsModule, NzButtonModule, NzGridModule],
  templateUrl: './form-employe.component.html',
  styleUrl: './form-employe.component.css',
})
export class FormEmployeComponent {
  employe: Employe =new Employe();

  constructor(
    private callAPI: CallAPI,
    private router: Router
  ) { }

  reloadComponent() {
    this.router.navigateByUrl('/welcome', { skipLocationChange: true }).then(() => {
      this.router.navigate(['welcome']);
    });
  }

  onSubmit(){
    this.callAPI.saveEmploye(this.employe).subscribe(
      (data: any) => {
        this.reloadComponent()
      },
      (error: any) => {
        // Gérez les erreurs ici
        console.error('Erreur', error);
      }
    );
    return false;
  }

}
