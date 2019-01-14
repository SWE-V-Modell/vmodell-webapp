import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from 'src/models/dynamicForms/field';
import { FieldConfig } from 'src/models/dynamicForms/field-config';

@Component({
  selector: 'form-button',
  templateUrl: './form-button.component.html'
})
export class FormButtonComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
