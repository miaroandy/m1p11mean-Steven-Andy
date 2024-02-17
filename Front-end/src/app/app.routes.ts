import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TemplateEmployeComponent } from './template/employe/templateEmploye.component';
import { InscriptionComponent } from './login/inscription.component';
import { HomeComponent } from './home/home.component';
import { TemplateClientComponent } from './template/client/templateClient.component';
import { ProfilComponent } from './profil/profil.component';

export const routes: Routes = [
  { path: 'login/:role', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  {
    path: 'client',
    component: TemplateClientComponent,
    children: [
      {
        path: 'profil', component : ProfilComponent
      },
      {
        path: '', component: HomeComponent
      }
    ],
  },
  {
    path: 'admin',
    component: TemplateEmployeComponent, 
    children: [
      {
        path: 'service', 
        loadChildren: () => import('./service/service.routes').then(m => m.SERVICE_ROUTES)
      },
      {
        path: 'employe',
        loadChildren: () => import('./employe/employe.routes').then(m => m.EMPLOYE_ROUTES)
      },
      {
        path: '',
        loadChildren: () => import('./employe/employe.routes').then(m => m.EMPLOYE_ROUTES)
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: '/client' }
];
