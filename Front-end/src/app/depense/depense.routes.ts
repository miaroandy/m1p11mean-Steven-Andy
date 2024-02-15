import { Routes } from '@angular/router';
import { ListDepenseComponent } from './list-depense/list-depense.component';
import { FormDepenseComponent } from './form-depense/form-depense.component';
import { FicheDepenseComponent } from './fiche-depense/fiche-depense.component';

export const DEPENSE_ROUTES: Routes = [
    { path: 'add', component: FormDepenseComponent },
    { path: ':id', component: FicheDepenseComponent },
    { path: '', component: ListDepenseComponent }
];
