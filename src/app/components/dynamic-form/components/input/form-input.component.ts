import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from 'src/models/dynamicForms/field';
import { FieldConfig } from 'src/models/dynamicForms/field-config';
@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html'
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
