import { Component, OnInit } from '@angular/core';
import { Employe } from '../../model/Employe';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgFor,NgIf } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CallAPI } from '../../utilitaires/CallAPI';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-employe',
  standalone: true,
  imports: [NzTableModule, NzTypographyModule, NgFor, NgIf, NzSpinModule, NzButtonModule, RouterLink],
  templateUrl: './list-employe.component.html',
  styleUrl: './list-employe.component.css',
  providers: []
})
export class ListEmployeComponent implements OnInit {
  employes: Employe[] = [];
  nbrEmployes: number = 0;
  loading=true;

  constructor(private callAPI: CallAPI,
    private router: Router
  ) { }

  ngOnInit() {
    this.callAPI.getAllEmployes().subscribe(result => {
      this.employes = result;
      this.nbrEmployes = this.employes.length;
      this.loading=false;
    });
  }

  navigate(id: string){
    this.router.navigate(['/employe', id])
  }
}
