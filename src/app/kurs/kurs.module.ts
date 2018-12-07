import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { MaterialModule } from '../shared/material.module';
import { ComponentsModule } from '../components/components.module';

import { KursComponent } from './kurs/kurs.component';
import { KursDetailComponent } from './kurs-detail/kurs-detail.component';

const routes: Routes = [
  { path: '', component: KursComponent },
  { path: 'edit/:id', component: KursDetailComponent },
];

@NgModule({
  declarations: [
    KursComponent, KursDetailComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ]
})
export class KursModule { }
