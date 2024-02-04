import { Component } from '@angular/core';
import { Service } from '../../model/Service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgFor,NgIf } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CallAPI } from '../../utilitaires/CallAPI';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@Component({
  selector: 'app-list-service',
  standalone: true,
  imports: [NzTableModule, NgFor, NzInputModule, NgIf, NzSpinModule],
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.css',
  providers: [CallAPI]
})
export class ListServiceComponent {
  services: Service[] = [];
  nbrServices: number = 0;

  constructor(private callAPI: CallAPI) { }

  ngOnInit() {
    this.callAPI.getAllServices().subscribe(
      (data) => {
        this.services = data;
        this.nbrServices = this.services.length;
      },
      (error) => {
        // Gérez les erreurs ici
        console.error('Erreur lors de la récupération des données de l\'API', error);
      }
    );
  }

}
