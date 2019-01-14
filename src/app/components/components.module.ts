import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../shared/material.module';

import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-form/components/dynamic-field.directive';
import { FormButtonComponent } from './dynamic-form/components/button/form-button.component';
import { FormInputComponent } from './dynamic-form/components/input/form-input.component';
import { FormSelectComponent } from './dynamic-form/components/select/form-select.component';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFieldDirective,
    DynamicFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent
  ],
  exports: [
    DynamicFormComponent
  ],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent
  ]
})
export class ComponentsModule { }
