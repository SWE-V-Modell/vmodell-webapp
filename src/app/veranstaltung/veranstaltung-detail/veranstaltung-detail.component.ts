import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldConfig } from 'src/models/dynamicForms/field-config';
import { DynamicFormComponent } from 'src/app/components/dynamic-form/dynamic-form.component';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-veranstaltung-detail',
  templateUrl: './veranstaltung-detail.component.html',
  styleUrls: ['./veranstaltung-detail.component.scss']
})
export class VeranstaltungDetailComponent implements OnInit {
  id: number;
  veranstaltung: Veranstaltung;
  module: Modul[];
  get(prop: string) { return this.veranstaltungsForm.get(prop); }
  veranstaltungsForm: FormGroup;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.veranstaltung = { Anmerkung: '', Bis: new Date(), Von: new Date(), Datum: new Date(), Modul: 1, Id: 1 }
    this.veranstaltungsForm = new FormGroup({
      modul: new FormControl(this.veranstaltung.Modul, Validators.required),
      datum: new FormControl(this.veranstaltung.Datum, Validators.required),
      von: new FormControl(this.veranstaltung.Von, Validators.required),
      bis: new FormControl(this.veranstaltung.Bis, Validators.required),
      anmerkung: new FormControl(this.veranstaltung.Anmerkung, Validators.required)
    })
  }

}
