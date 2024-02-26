import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TemplateEmployeComponent } from './template/employe/templateEmploye.component';
import { InscriptionComponent } from './login/inscription.component';
import { HomeComponent } from './home/home.component';
import { TemplateClientComponent } from './template/client/templateClient.component';
import { ProfilComponent } from './profil/profil.component';
import { TemplateAdminComponent } from './template/admin/templateAdmin.component';
import { HomeServiceComponent } from './homeService/home-service.component';
import { PayementComponent } from './payement/payement.component';

export const routes: Routes = [
  { path: 'login/:role', component: LoginComponent },
  { path: 'inscription', component: InscriptionComponent },
  {path: 'employe',component: TemplateEmployeComponent},
  {
    path: 'client',component: TemplateClientComponent,
    children: [
      {
        path: 'profil', component : ProfilComponent
      },
      {
        path: 'payement', component: PayementComponent
      },
      {
        path: 'service/:id', component: HomeServiceComponent
      },
      {
        path: '', component: HomeComponent
      }
    ],
  },
  {
    path: 'admin',
    component: TemplateAdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./stats/stats.routes').then(m => m.STATS_ROUTES)
      },
      {
        path: 'service',
        loadChildren: () => import('./service/service.routes').then(m => m.SERVICE_ROUTES)
      },
      {
        path: 'depense',
        loadChildren: () => import('./depense/depense.routes').then(m => m.DEPENSE_ROUTES)
      },
      {
        path: 'employe',
        loadChildren: () => import('./employe/employe.routes').then(m => m.EMPLOYE_ROUTES)
      }
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: '/client' }
];
