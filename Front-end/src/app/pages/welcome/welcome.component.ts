import { Component, OnInit } from '@angular/core';
import { CallAPI } from '../../utilitaires/CallAPI';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css'],
  providers:[CallAPI]
})
export class WelcomeComponent implements OnInit {

  constructor(private callAPI : CallAPI) { }

  ngOnInit() { 
    this.callAPI.getAllEmployes().subscribe(
      (data) => {
        // Traitez les données de la réponse ici
        console.log(data);
      },
      (error) => {
        // Gérez les erreurs ici
        console.error('Erreur lors de la récupération des données de l\'API', error);
      }
    );
  }

}
