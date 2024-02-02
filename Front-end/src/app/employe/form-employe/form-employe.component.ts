import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CallAPI } from '../../utilitaires/CallAPI';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Employe } from '../../model/Employe';


@Component({
  selector: 'app-form-employe',
  standalone: true,
  imports: [NzInputModule, FormsModule, NzButtonModule, NzGridModule],
  templateUrl: './form-employe.component.html',
  styleUrl: './form-employe.component.css',
})
export class FormEmployeComponent implements OnInit {
  nom: string | undefined;
  prenom: string | undefined;
  email: string |undefined;

  constructor(
    private callAPI: CallAPI,
  ) { }

  ngOnInit(): void {
      
  }

  onSubmit(){
    console.log(this.nom+""+this.prenom+""+this.email);
  }

}
