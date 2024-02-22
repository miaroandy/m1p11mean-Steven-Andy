import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgFor,NgIf } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CallAPI } from '../utilitaires/CallAPI';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Chart } from 'chart.js/auto';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [NzTableModule, NzTypographyModule, NgFor, NgIf, NzSpinModule, NzButtonModule, NgChartsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  public tempsTravailMoyen: any[] = [];
  public reservationsParJour: any[] = [];
  public reservationsParMois: any[] = [];
  public chiffreAffairesParJour: any[] = [];
  public chiffreAffairesParMois: any[] = [];
  public beneficeParMois: any[] = [];

  constructor(private callAPI: CallAPI,) {}

  ngOnInit(): void {
    this.getTempsTravailMoyen();
    this.getReservationsParJour();
    this.getReservationsParMois();
    this.getChiffreAffairesParJour();
    this.getChiffreAffairesParMois();
    this.getBeneficeParMois();
  }

  getTempsTravailMoyen(): void {
    this.callAPI.getTempsTravailMoyen()
      .subscribe((data: any[]) => {
        this.tempsTravailMoyen = data;
      }, (error) => {
        console.error('Erreur lors de la récupération du temps moyen de travail pour chaque employé :', error);
      });
  }

  getReservationsParJour(): void {
    this.callAPI.getReservationsParJour()
      .subscribe((data: any[]) => {
        this.reservationsParJour = data;
        this.createReservationsParJourChart();
      }, (error) => {
        console.error('Erreur lors de la récupération des réservations par jour :', error);
      });
  }

  getReservationsParMois(): void {
    this.callAPI.getReservationsParMois()
      .subscribe((data: any[]) => {
        this.reservationsParMois = data;
        this.createReservationsParMoisChart();
      }, (error) => {
        console.error('Erreur lors de la récupération des réservations par mois :', error);
      });
  }

  getChiffreAffairesParJour(): void {
    this.callAPI.getChiffreAffairesParJour()
      .subscribe((data: any[]) => {
        this.chiffreAffairesParJour = data;
        this.createChiffreAffairesParJourChart();
      }, (error) => {
        console.error('Erreur lors de la récupération du chiffre d\'affaire par jour :', error);
      });
  }

  getChiffreAffairesParMois(): void {
    this.callAPI.getChiffreAffairesParMois()
      .subscribe((data: any[]) => {
        this.chiffreAffairesParMois = data;
        this.createChiffreAffairesParMoisChart();
      }, (error) => {
        console.error('Erreur lors de la récupération du chiffre d\'affaire par mois :', error);
      });
  }

  getBeneficeParMois(): void {
    this.callAPI.getBeneficeParMois()
      .subscribe((data: any[]) => {
        this.beneficeParMois = data;
        this.createBeneficeParMoisChart();
      }, (error) => {
        console.error('Erreur lors de la récupération des bénéfices par mois :', error);
      });
  }

  createReservationsParJourChart(): void {
    const jours = this.reservationsParJour.map(stat => stat._id);
    const nombreReservations = this.reservationsParJour.map(stat => stat.nombre_reservations);

    new Chart("reservationsParJourChart", {
      type: 'bar',
      data: {
        labels: jours,
        datasets: [{
          label: 'Nombre de réservations par jour',
          data: nombreReservations,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createReservationsParMoisChart(): void {
    const mois = this.reservationsParMois.map(stat => stat._id);
    const nombreReservations = this.reservationsParMois.map(stat => stat.nombre_reservations);

    new Chart("reservationsParMoisChart", {
      type: 'bar',
      data: {
        labels: mois,
        datasets: [{
          label: 'Nombre de réservations par mois',
          data: nombreReservations,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createChiffreAffairesParJourChart(): void {
    const jours = this.chiffreAffairesParJour.map(stat => stat._id);
    const chiffreAffaires = this.chiffreAffairesParJour.map(stat => stat.chiffre_affaires);

    new Chart("chiffreAffairesParJourChart", {
      type: 'bar',
      data: {
        labels: jours,
        datasets: [{
          label: 'Chiffre d\'affaires par jour',
          data: chiffreAffaires,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createChiffreAffairesParMoisChart(): void {
    const mois = this.chiffreAffairesParMois.map(stat => stat._id.month);
    const chiffreAffaires = this.chiffreAffairesParMois.map(stat => stat.chiffre_affaires);

    new Chart("chiffreAffairesParMoisChart", {
      type: 'bar',
      data: {
        labels: mois,
        datasets: [{
          label: 'Chiffre d\'affaires par mois',
          data: chiffreAffaires,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createBeneficeParMoisChart(): void {
    const mois = this.beneficeParMois.map(stat => stat.mois);
    const benefice = this.beneficeParMois.map(stat => stat.benefice);

    new Chart("beneficeParMoisChart", {
      type: 'bar',
      data: {
        labels: mois,
        datasets: [{
          label: 'Bénéfice par mois',
          data: benefice,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
