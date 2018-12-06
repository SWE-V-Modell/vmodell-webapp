import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './shared/login/login.guard';

const routes: Routes = [
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [LoginGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
