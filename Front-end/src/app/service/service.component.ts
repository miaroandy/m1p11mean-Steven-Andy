import { Component } from '@angular/core';
import { FormServiceComponent } from './form-service/form-service.component';
import { ListServiceComponent } from './list-service/list-service.component';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [FormServiceComponent, ListServiceComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent {

}
