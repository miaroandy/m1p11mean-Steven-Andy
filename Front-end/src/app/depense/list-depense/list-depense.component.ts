import { Component, OnInit } from '@angular/core';
import { Depense } from '../../model/Depense';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule, NgFor,NgIf } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CallAPI } from '../../utilitaires/CallAPI';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-depense',
  standalone: true,
  imports: [NzTableModule, NzTypographyModule, NgFor, NgIf, NzSpinModule, NzButtonModule,CommonModule],
  templateUrl: './list-depense.component.html',
  styleUrl: './list-depense.component.css',
  providers: []
})
export class ListDepenseComponent implements OnInit {
  depenses: Depense[] = [];
  nbrDepenses: number = 0;
  loading=true;

  constructor(private callAPI: CallAPI,
    private router: Router
  ) { }

  ngOnInit() {
    this.callAPI.getAllDepenses().subscribe(result => {
      this.depenses = result;
      this.nbrDepenses = this.depenses.length;
      this.loading=false;
    });
  }

  onClick(id: string){
    this.router.navigate(['/depense', id])
  }
}
