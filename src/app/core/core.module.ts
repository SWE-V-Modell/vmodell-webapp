import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../shared/material.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    MaterialModule,
    RouterModule
  ]
})
export class CoreModule { }
