import { Routes } from '@angular/router';
import { ListServiceComponent } from './list-service/list-service.component';
import { FormServiceComponent } from './form-service/form-service.component';
import { FicheServiceComponent } from './fiche-service/fiche-service.component';

export const SERVICE_ROUTES: Routes = [
  { path: 'add', component: FormServiceComponent },
  { path: ':id', component: FicheServiceComponent },
  { path: '', component: ListServiceComponent }
];
