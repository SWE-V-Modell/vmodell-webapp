import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    MaterialModule
  ]
})
export class ComponentsModule { }
