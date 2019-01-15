import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material.module';
import { ComponentsModule } from '../components/components.module';

import { VeranstaltungComponent } from './veranstaltung/veranstaltung.component';
import { VeranstaltungDetailComponent } from './veranstaltung-detail/veranstaltung-detail.component';

const routes: Routes = [
  { path: '', component: VeranstaltungComponent },
  { path: 'edit/:id', component: VeranstaltungDetailComponent },
];

@NgModule({
  declarations: [
    VeranstaltungComponent, VeranstaltungDetailComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class VeranstaltungModule { }
