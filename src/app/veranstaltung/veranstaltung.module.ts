import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material.module';
import { ComponentsModule } from '../components/components.module';

import { VeranstaltungComponent } from './veranstaltung/veranstaltung.component';
import { VeranstaltungDetailComponent } from './veranstaltung-detail/veranstaltung-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    VeranstaltungComponent, VeranstaltungDetailComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class VeranstaltungModule { }
