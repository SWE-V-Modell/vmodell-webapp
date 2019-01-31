import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../shared/material.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';

@NgModule({
  declarations: [DashboardComponent, EventComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    MaterialModule,
    RouterModule,
  ]
})
export class DashboardModule { }
