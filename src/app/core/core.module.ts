import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../shared/material.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DerPostillionComponent } from './der-postillion/der-postillion.component'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidenavComponent, DerPostillionComponent],
  exports: [SidenavComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    MaterialModule,
    RouterModule
  ]
})
export class CoreModule { }
