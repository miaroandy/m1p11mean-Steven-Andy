import { Routes } from '@angular/router';
import { ListEmployeComponent } from './list-employe/list-employe.component';
import { FormEmployeComponent } from './form-employe/form-employe.component';
import { FicheEmployeComponent } from './fiche-employe/fiche-employe.component';

export const EMPLOYE_ROUTES: Routes = [
    { path: ':id', component: FicheEmployeComponent },
    { path: 'add', component: FormEmployeComponent },
    { path: '', component: ListEmployeComponent }
];
