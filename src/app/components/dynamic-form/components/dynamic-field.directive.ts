import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormButtonComponent } from './button/form-button.component';
import { FormInputComponent } from './input/form-input.component';
import { FormSelectComponent } from './select/form-select.component';

import { Field } from 'src/models/dynamicForms/field';
import { FieldConfig } from 'src/models/dynamicForms/field-config';

const components: { [type: string]: Type<Field> } = {
  button: FormButtonComponent,
  input: FormInputComponent,
  select: FormSelectComponent
};

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input() config: FieldConfig;
  @Input() group: FormGroup;

  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
