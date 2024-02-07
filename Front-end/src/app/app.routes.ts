import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'employe', loadChildren: () => import('./employe/employe.routes').then(m => m.EMPLOYE_ROUTES) },
  { path: 'service', loadChildren: () => import('./service/service.routes').then(m => m.SERVICE_ROUTES) },
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: '/employe' }
];
