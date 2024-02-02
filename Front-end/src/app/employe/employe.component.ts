import { Component } from '@angular/core';
import { FormEmployeComponent } from './form-employe/form-employe.component';
import { ListEmployeComponent } from './list-employe/list-employe.component';

@Component({
  selector: 'app-employe',
  standalone: true,
  imports: [FormEmployeComponent,ListEmployeComponent],
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.css'
  
})
export class EmployeComponent {
  
}
