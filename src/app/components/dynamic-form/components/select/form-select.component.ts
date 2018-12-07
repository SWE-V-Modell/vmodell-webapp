import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from 'src/models/dynamicForms/field';
import { FieldConfig } from 'src/models/dynamicForms/field-config';

@Component({
  selector: 'form-select',
  templateUrl: './form-select.component.html'
})
export class FormSelectComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
