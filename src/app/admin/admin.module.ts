import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    MaterialModule
  ]
})
export class AdminModule { }
