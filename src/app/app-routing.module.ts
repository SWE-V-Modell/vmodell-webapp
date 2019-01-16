import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './shared/login/login.guard';

const routes: Routes = [
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [LoginGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'statistics', loadChildren: './statistics/statistics.module#StatisticsModule' },
  { path: 'kurs', loadChildren: './kurs/kurs.module#KursModule', canActivate: [LoginGuard] },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
