import { Component, OnInit, ViewChild, Input, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';


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
  subscription: Subscription[];
  student: Student = {} as Student;
  dozent: Dozent = {} as Student;
  admin: Admin = {} as Admin;
  veranstaltung: Veranstaltung = {} as Veranstaltung;
  gruppe: Gruppe = {} as Gruppe;
  veranstaltungsgruppen: Gruppe[];
  account: MyAccount = {} as MyAccount;
  student_gruppe: Gruppe;

  constructor(private dataService: DataService) { }

  get name() { return this.form.get('name'); }
  get gruppen() { return this.form.get('gruppen'); }
  get date() { return this.form.get('date'); }
  get start() { return this.form.get('start'); }
  get end() { return this.form.get('end'); }
  get email() { return this.form.get('email'); }
  get bezeichnung() { return this.form.get('bezeichnung'); }
  get password() { return this.form.get('password'); }
  get sgruppe() { return this.form.get('sgruppe'); }

  ngOnChanges() {
    this.initializeEmptyForm();
    this.subscription.push(this.dataService.gruppeClient.getAll().subscribe(data => this.gruppenOptions = data));
    if (this.data != -1) {
      if (this.type != 1 && this.type != 4)
        this.subscription.push(this.dataService.accountClient.getById(this.data.account).subscribe(data => {
          this.account = data;
          this.subscription.push(this.dataService.gruppeClient.getById(this.data.gruppe).subscribe(data => {
            this.student_gruppe = data;
            this.disableForm(true);
            this.patchValue;
            this.disabled = true;
            this.createmod = false;
          }))
        }));
      else if (this.type == 1)
        this.subscription.push(this.dataService.veranstaltungsgruppeClient.getAll().subscribe(data => {
          data = data.filter(vg => vg.veranstaltung == this.data.id);
          this.subscription.push(this.dataService.gruppeClient.getAll().subscribe(
            gruppen => this.veranstaltungsgruppen = gruppen.filter(g => {
              for (let vg of data) {
                if (vg.gruppe == g.id)
                  return true
              }
              return false;
            })
          ));
        }))
      else {
        this.disableForm(true);
        this.patchValue();
        this.disabled = true;
        this.createmod = false;
      }
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
    this.veranstaltungsgruppen ? this.gruppen.patchValue(this.veranstaltungsgruppen) : null;
    this.student_gruppe ? this.sgruppe.patchValue(this.student_gruppe) : null;
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
      'bezeichnung': new FormControl('', Validators.required),
      'sgruppe': new FormControl('', Validators.required)
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
    bool ? this.sgruppe.disable() : this.sgruppe.enable();
    this.disabled = bool;
  }

  isFormValid() {
    try {
      if (
        (((this.type == 2 || this.type == 3) && (!this.name.invalid && !this.password.invalid && !this.email.invalid))
          || (this.type == 1 && !this.gruppen.invalid && !this.date.invalid && !this.start.invalid && !this.end.invalid)
          || (this.type == 4 && !this.bezeichnung.invalid)
          || (this.type == 0 && !this.sgruppe.invalid && !this.name.invalid && !this.password.invalid && !this.email.invalid))
          )
        return true;
    } catch (e) {
      return false;
    }
    return false;
  }

  ngOnDestroy() {
    for (let s of this.subscription)
      this.subscription.pop().unsubscribe();
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
        this.getAccountValues(this.student, mode);
        break;
      case 1:
        let start = new Date(this.date.value)
        start.setHours(this.start.value.split(':')[0])
        start.setMinutes(this.start.value.split(':')[1]);
        let end = start;
        end.setHours(this.start.value.split(':')[0])
        end.setMinutes(this.start.value.split(':')[1]);
        if (mode == 'create') {
          this.veranstaltung.von = start
          this.veranstaltung.bis = end
          this.veranstaltung.datum = new Date(this.date.value)
        }
        if (mode == 'edit') {
          this.data.Von = start
          this.data.Bis = end
          this.data.Datum = new Date(this.date.value)
        }
        break;
      case 2:
        this.getAccountValues(this.dozent, mode);
        break;
      case 3:
        this.getAccountValues(this.admin, mode);
        break;
      case 4:
        this.gruppe.beschreibung = this.bezeichnung.value;
    }
  }

  getAccountValues(data: any, mode: string) {
    this.account.eMail = this.email.value;
    this.account.passwort = this.password.value;
    if (mode == 'edit')
      this.data.name = this.name.value;
    if (mode == 'create')
      data.name = this.name.value;
  }

  setVeranstaltungsgruppen() {
    this.deleteVeranstaltungsgruppen();
    this.subscription.push(this.dataService.veranstaltungClient.getAll().subscribe(data => {
      let ids: number[] = [];
      for (let v of data)
        ids.push(v.id);
      let vg: Veranstaltungsgruppe = {} as Veranstaltungsgruppe;
      for (let g_id of this.gruppen.value) {
        vg.gruppe = g_id;
        vg.veranstaltung = Math.max(...ids);
        this.dataService.veranstaltungsgruppeClient.create(0, vg);
      }
    }));
  }

  deleteVeranstaltungsgruppen(){
    for (let v of this.veranstaltungsgruppen)
      this.dataService.veranstaltungsgruppeClient.delete(v.id);
  }

  save() {
    this.getFormData('edit');
    this.disableForm(true);
    if (this.type == 0)
      this.dataService.studentClient.update(this.data.id, this.data);
    if (this.type == 1) {
      this.dataService.veranstaltungClient.update(this.data.id, this.data);
      this.setVeranstaltungsgruppen;
    }
    if (this.type == 2)
      this.dataService.dozentClient.update(this.data.id, this.data);
    if (this.type == 3)
      this.dataService.adminClient.update(this.data.id, this.data);
    if (this.type == 4)
      this.dataService.gruppeClient.update(this.data.id, this.data);
  }

  create() {
    this.getFormData('create');
    this.disableForm(true);
    if (this.type == 0)
      this.dataService.studentClient.create(0, this.student);
    if (this.type == 1) {
      this.dataService.veranstaltungClient.create(0, this.veranstaltung);
      this.setVeranstaltungsgruppen();
    }
    if (this.type == 2)
      this.dataService.dozentClient.create(0, this.dozent);
    if (this.type == 3)
      this.dataService.adminClient.create(0, this.admin);
    if (this.type == 4)
      this.dataService.gruppeClient.create(0, this.gruppe);
    this.close.emit();
  }

  delete() {
    if (this.type == 0)
      this.dataService.studentClient.delete(this.data.Id);
    if (this.type == 1){
      this.deleteVeranstaltungsgruppen();
      this.dataService.veranstaltungClient.delete(this.data.Id);
    }
    if (this.type == 2)
      this.dataService.dozentClient.delete(this.data.Id);
    if (this.type == 3)
      this.dataService.adminClient.delete(this.data.Id);
    if (this.type == 4)
      this.dataService.gruppeClient.delete(this.data.Id);
    this.close.emit();
  }

}
