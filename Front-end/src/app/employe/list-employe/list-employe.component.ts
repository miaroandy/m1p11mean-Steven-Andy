import { Component } from '@angular/core';
import { Employe } from '../../model/Employe';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgFor,NgIf } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CallAPI } from '../../utilitaires/CallAPI';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@Component({
  selector: 'app-list-employe',
  standalone: true,
  imports: [NzTableModule, NgFor, NzInputModule, NgIf, NzSpinModule],
  templateUrl: './list-employe.component.html',
  styleUrl: './list-employe.component.css',
  providers: [CallAPI]
})
export class ListEmployeComponent {
  employes: Employe[] = [];
  nbrEmployes: number = 0;

  constructor(private callAPI: CallAPI) { }

  ngOnInit() {
    this.callAPI.getAllEmployes().subscribe(
      (data) => {
        this.employes = data;
        this.nbrEmployes = this.employes.length;
      },
      (error) => {
        // Gérez les erreurs ici
        console.error('Erreur lors de la récupération des données de l\'API', error);
      }
    );
  }

}
