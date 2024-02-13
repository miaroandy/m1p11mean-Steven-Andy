import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TemplateEmployeComponent } from './template/employe/templateEmploye.component';
import { InscriptionComponent } from './login/inscription.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  {
    path: 'employe',
    component: TemplateEmployeComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'service', // child route path
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
  { path: '', pathMatch: 'full', redirectTo: '/employe/employe' }
];
