import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldConfig } from 'src/models/dynamicForms/field-config';
import { DynamicFormComponent } from 'src/app/components/dynamic-form/dynamic-form.component';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';



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

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.dataService.getVeranstaltung(this.id).subscribe(veranstaltung => {
      this.veranstaltung = veranstaltung;
      this.veranstaltungsForm = new FormGroup({
        modul: new FormControl(this.veranstaltung.title, Validators.required),
        datum: new FormControl(this.veranstaltung.begin, Validators.required),
        von: new FormControl(this.veranstaltung.begin, Validators.required),
        bis: new FormControl(this.veranstaltung.end, Validators.required),
        anmerkung: new FormControl(this.veranstaltung.description, Validators.required)
      })
    })

    this.dataService.getAllModuls().subscribe(moduls => {
      this.module = moduls;
    })

  }

}
