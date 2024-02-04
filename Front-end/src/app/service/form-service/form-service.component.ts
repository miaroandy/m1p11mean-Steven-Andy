import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CallAPI } from '../../utilitaires/CallAPI';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Service } from '../../model/Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-service',
  standalone: true,
  imports: [NzInputModule, FormsModule, NzButtonModule, NzGridModule],
  templateUrl: './form-service.component.html',
  styleUrl: './form-service.component.css'
})
export class FormServiceComponent {
  service: Service = new Service();

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
    this.callAPI.saveService(this.service).subscribe(
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
