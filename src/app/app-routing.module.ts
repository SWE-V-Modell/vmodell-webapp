import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './shared/login/login.guard';

const routes: Routes = [
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [LoginGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'statistics', loadChildren: './statistics/statistics.module#StatisticsModule' },
  { path: 'veranstaltung', loadChildren: './veranstaltung/veranstaltung.module#VeranstaltungModule', canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
