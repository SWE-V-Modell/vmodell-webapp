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

  veranstaltungsForm: FormGroup;
  get(prop: string) { return this.veranstaltungsForm.get(prop); }

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.dataService.veranstaltungClient.getById(this.id).subscribe(veranstaltung => {
      this.veranstaltung = veranstaltung[0];
      console.log(veranstaltung);
      this.veranstaltung.datum = new Date(this.veranstaltung.date_Begin);
      this.veranstaltung.date_Begin = new Date(this.veranstaltung.date_Begin);
      this.veranstaltung.date_End = new Date(this.veranstaltung.date_End);
      console.log(this.veranstaltung);
      this.veranstaltungsForm = new FormGroup({
        datum: new FormControl(this.veranstaltung.datum, Validators.required),
        title: new FormControl(this.veranstaltung.titel, Validators.required),
        von: new FormControl(this.dateToTime(this.veranstaltung.date_Begin), Validators.required),
        bis: new FormControl(this.dateToTime(this.veranstaltung.date_End), Validators.required),
        anmerkung: new FormControl(this.veranstaltung.anmerkung)
      });
      this.veranstaltungsForm.valueChanges.subscribe(data => {
        this.timeToDate(data['von'], 'von');
        this.timeToDate(data['bis'], 'bis');
      });
    });
  }

  save() {
    console.log(this.veranstaltung);
    this.dataService.veranstaltungClient.update(this.veranstaltung.id, this.veranstaltung);
  }

  private dateToTime(input: Date): string {
    if (!input) return '00:00';
    return input.getHours().toString().padStart(2, '0') + ':'
      + input.getMinutes().toString().padStart(2, '0');
  }

  private timeToDate(input: string, which: string) {
    this.veranstaltung[which].setMinutes(+input.split(':')[1].split(' ')[0]);
    let extraHours = 0; if (input.split(' ')[1] === 'pm') extraHours = 12;
    this.veranstaltung[which].setHours(+input.split(':')[0] + extraHours);
  }

  private dateToSqlDate(date: Date): string {
    return [date.getFullYear(), date.getMonth(), date.getDate()].map((x: any) => {
      return x.toString().padStart(2, '0');
    }).join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].map((x: any) => {
      return x.toString().padStart(2, '0');
    }).join(':');
  }
}
