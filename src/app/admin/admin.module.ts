import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../shared/material.module';

import { AdminViewComponent } from './admin-view/admin-view.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [AdminViewComponent, ListComponent, DetailComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    MaterialModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AdminModule { }
