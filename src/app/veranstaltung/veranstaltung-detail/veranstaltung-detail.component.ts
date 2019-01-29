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
  moduls: Modul[];
  get(prop: string) { return this.veranstaltungsForm.get(prop); }
  veranstaltungsForm: FormGroup;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.dataService.veranstaltungClient.getById(this.id).subscribe(veranstaltung => {
      this.veranstaltung = veranstaltung[0];
      this.veranstaltung.datum = new Date(this.veranstaltung.datum);
      this.veranstaltung.von = new Date(this.veranstaltung.von);
      this.veranstaltung.bis = new Date(this.veranstaltung.bis);
      console.log(this.veranstaltung);
      this.veranstaltungsForm = new FormGroup({
        modul: new FormControl(this.veranstaltung.modul, Validators.required),
        datum: new FormControl(this.veranstaltung.datum, Validators.required),
        title: new FormControl(this.veranstaltung.titel, Validators.required),
        von: new FormControl(this.dateToTime(this.veranstaltung.von), Validators.required),
        bis: new FormControl(this.dateToTime(this.veranstaltung.von), Validators.required),
        anmerkung: new FormControl(this.veranstaltung.anmerkung)
      })
      this.veranstaltungsForm.valueChanges.subscribe(data => {
        this.timeToDate(data['von'], 'von');
        this.timeToDate(data['bis'], 'bis');
      })
    })
    this.dataService.modulClient.getAll().subscribe(moduls => {
      this.moduls = moduls;
    })
  }

  save() {
    this.dataService.veranstaltungClient.update(this.veranstaltung.id, this.veranstaltung);
  }

  private dateToTime(input: Date): string {
    if (!input) return '00:00';
    return input.getHours().toString().padStart(2, '0') + ':'
      + input.getMinutes().toString().padStart(2, '0');
  }

  private timeToDate(input: string, which: string) {
    this.veranstaltung[which].setMinutes(+input.split(':')[1].split(' ')[0]);
    var extraHours = 0; if (input.split(' ')[1] === 'pm') extraHours = 12;
    this.veranstaltung[which].setHours(+input.split(':')[0] + extraHours);
  }

  private dateToSqlDate(date: Date): string {
    return [date.getFullYear(), date.getMonth(), date.getDate()].map((x: any) => {
      return x.toString().padStart(2, '0');
    }).join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].map((x: any) => {
      return x.toString().padStart(2, '0');
    }).join(':')
  }
}
