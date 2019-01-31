import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './shared/login/login.guard';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { RegisterComponent } from './login/register/register.component';
import { StatisticsComponent } from './statistics/statistics/statistics.component';
import { VeranstaltungComponent } from './veranstaltung/veranstaltung/veranstaltung.component';
import { VeranstaltungDetailComponent } from './veranstaltung/veranstaltung-detail/veranstaltung-detail.component';

const routes: Routes = [
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [LoginGuard] },
  { path: '', component: DashboardComponent, canActivate: [LoginGuard] },
  {
    path: 'login', children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  { path: 'statistics', component: StatisticsComponent },
  {
    path: 'veranstaltung', canActivate: [LoginGuard], children: [
      { path: '', component: VeranstaltungComponent },
      { path: 'edit/:id', component: VeranstaltungDetailComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
