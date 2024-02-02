import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'employe', loadChildren: () => import('./employe/employe.routes').then(m => m.EMPLOYE_ROUTES) },
  { path: '', pathMatch: 'full', redirectTo: '/employe' }
];
