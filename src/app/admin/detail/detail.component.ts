import { Component, OnInit, ViewChild, Input, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AdminDataService } from '../admin-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnChanges, OnDestroy {

  @Input() data: any;
  @Input() type: number;
  @Output() close: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  disabled: boolean;
  createmod: boolean;
  gruppenOptions;
  subscription: Subscription;
  student: Student = {} as Student;
  dozent: Dozent = {} as Student;
  veranstaltung: Veranstaltung = {} as Veranstaltung;
  gruppe: Gruppe = {} as Gruppe;

  constructor(private dataServ: AdminDataService) { }

  get name() { return this.form.get('name'); }
  get gruppen() { return this.form.get('gruppen'); }
  get date() { return this.form.get('date'); }
  get start() { return this.form.get('start'); }
  get end() { return this.form.get('end'); }
  get email() { return this.form.get('email'); }
  get bezeichnung() { return this.form.get('bezeichnung'); }
  get password() { return this.form.get('password'); }

  ngOnChanges() {
    this.initializeEmptyForm();
    this.subscription = this.dataServ.getAllGruppes().subscribe(data => this.gruppenOptions = data);
    if (this.data != -1) {
      this.disableForm(true);
      this.patchValue();
      this.disabled = true;
      this.createmod = false;
    } else {
      this.disabled = false;
      this.createmod = true;
    }

  }

  patchValue() {
    this.data.Name ? this.name.patchValue(this.data.Name) : null;
    this.data.Modul != null ? this.gruppen.patchValue(this.data.Gruppe) : null;
    this.data.Datum ? this.date.patchValue(this.data.Datum) : null;
    this.data.Von ? this.start.patchValue(this.makeTime(this.data.Von)) : null;
    this.data.Bis ? this.end.patchValue(this.makeTime(this.data.Bis)) : null;
    this.data.EMail ? this.email.patchValue(this.data.EMail) : null;
    this.data.Passwort ? this.password.patchValue(this.data.Passwort) : null;
    this.data.Beschreibung ? this.bezeichnung.patchValue(this.data.Beschreibung) : null;
  }

  initializeEmptyForm() {
    this.form = new FormGroup({
      'name': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'gruppen': new FormControl('', Validators.required),
      'date': new FormControl('', Validators.required),
      'start': new FormControl('', Validators.required),
      'end': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'bezeichnung': new FormControl('', Validators.required)
    });
  }

  makeTime(date: Date) {
    let hours = date.getHours() + '';
    hours.length < 2 ? hours = '0' + hours : null;
    let minutes = date.getMinutes() + '';
    minutes.length < 2 ? minutes = '0' + minutes : null;
    return hours + ':' + minutes;
  }

  disableForm(bool: boolean) {
    bool ? this.name.disable() : this.name.enable();
    bool ? this.gruppen.disable() : this.gruppen.enable();
    bool ? this.date.disable() : this.date.enable();
    bool ? this.start.disable() : this.start.enable();
    bool ? this.end.disable() : this.end.enable();
    bool ? this.email.disable() : this.email.enable();
    bool ? this.password.disable() : this.password.enable();
    bool ? this.bezeichnung.disable() : this.bezeichnung.enable();
    this.disabled = bool;
  }

  isFormValid() {
    try {
      if (
        ((this.type == 0 || this.type == 2 || this.type == 3) && (!this.name.invalid && !this.password.invalid && !this.email.invalid)
        || (this.type == 1 && !this.gruppen.invalid && !this.date.invalid && !this.start.invalid && !this.end.invalid)
        || (this.type == 4 && !this.bezeichnung.invalid)))
        return true;
    } catch (e) {
      return false;
    }
    return false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cancel() {
    if (this.createmod)
      this.close.emit();
    else {
      this.ngOnDestroy();
      this.ngOnChanges();
    }
  }

  getFormData(mode: string) {
    switch (this.type) {
      case 0:
        if (mode == 'create'){
          this.student.Name = this.name.value;
          this.student.EMail = this.email.value;
          this.student.Passwort = this.password.value;
        }
        if (mode == 'edit')
          this.data.Name = this.name.value;
          this.data.EMail = this.email.value;
          this.data.Passwort = this.password.value;
        break;
      case 1:
        let start = new Date(this.date.value)
        start.setHours(this.start.value.split(':')[0])
        start.setMinutes(this.start.value.split(':')[1]);
        let end = start;
        end.setHours(this.start.value.split(':')[0])
        end.setMinutes(this.start.value.split(':')[1]);
        if (mode == 'create') {
          // this.veranstaltung.Modul = this.gruppen.value;
          this.veranstaltung.Von = start
          this.veranstaltung.Bis = end
          this.veranstaltung.Datum = new Date(this.date.value)
        }
        if (mode == 'edit') {
          this.data.Modul = this.gruppen.value;
          this.data.Von = start
          this.data.Bis = end
          this.data.Datum = new Date(this.date.value)
        }
        break;
      case 2:
        if (mode == 'create') {
          this.dozent.Name = this.name.value;
          this.dozent.EMail = this.email.value;
          this.dozent.Passwort = this.password.value;
        }
        if (mode == 'edit') {
          this.data.Name = this.name.value;
          this.data.EMail = this.email.value;
          this.data.Passwort = this.password.value;
        }
        break;
      case 3: 
      break;
    }
  }

  save() {
    this.getFormData('edit');
    this.disableForm(true);
    if (this.type == 0)
      this.dataServ.setStudent(this.data);
    if (this.type == 1)
      this.dataServ.setVeranstaltung(this.data)
    if (this.type == 2)
      this.dataServ.setDozent(this.data)
  }

  create() {
    this.getFormData('create');
    this.disableForm(true);
    if (this.type == 0)
      this.dataServ.createStudent(this.student);
    if (this.type == 1)
      this.dataServ.createVeranstaltung(this.veranstaltung)
    if (this.type == 2)
      this.dataServ.createDozent(this.dozent)
    this.close.emit();
  }

  delete(){
    if (this.type == 0)
      this.dataServ.deleteStudent(this.data.Id);
    if (this.type == 1)
      this.dataServ.deleteVeranstaltung(this.data.Id)
    if (this.type == 2)
      this.dataServ.deleteDozent(this.data.Id)
    this.close.emit();
  }

}
