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
  gruppenOptions: Gruppe[];
  dozentOptions: Dozent[];
  subscriptions: Subscription[] = [];
  student: Student = {} as Student;
  dozent: Dozent = {} as Dozent;
  admin: Admin = {} as Admin;
  veranstaltung: Veranstaltung = {} as Veranstaltung;
  gruppe: Gruppe = {} as Gruppe;
  veranstaltungsgruppen: number[] = [];
  veranstaltungsgruppenIds: number[] = [];
  account: MyAccount = {} as MyAccount;

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
  get vdozent() { return this.form.get('vdozent'); }

  ngOnChanges() {
    console.log(this.data);
    this.veranstaltungsgruppen = [];
    this.initializeEmptyForm();
    this.subscriptions.push(this.dataService.gruppeClient.getAll().subscribe(data => {
      this.gruppenOptions = data;
      this.subscriptions.push(this.dataService.dozentClient.getAll().subscribe(data => {
        this.dozentOptions = data;
        if (this.data !== -1) {
          if (this.type !== 1 && this.type !== 4)
            this.subscriptions.push(this.dataService.accountClient.getById(this.data.account).subscribe(data => {
              this.account = data[0];
              this.disableForm(true);
              this.patchValue();
              this.disabled = true;
              this.createmod = false;
            }));
          else if (this.type == 1)
            this.subscriptions.push(this.dataService.veranstaltungsgruppeClient.getAll().subscribe(data => {
              console.log("GRUPPECLIENT");
              console.log(data, this.data);
              data = data.filter(vg => vg.veranstaltung == this.data.id);
              console.log("Filtered");

              console.log(data);
              this.veranstaltungsgruppenIds = [];
              for (const vg of data) {
                this.veranstaltungsgruppen.push(vg.gruppe);
                this.veranstaltungsgruppenIds.push(vg.id);
              }
  console.log({gruppe: this.veranstaltungsgruppen, id: this.veranstaltungsgruppenIds, data: data});
              this.disableForm(true);
              this.patchValue();
              this.disabled = true;
              this.createmod = false;
            }));
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
      }));
    }));
  }

  patchValue() {
    this.data.name ? this.name.patchValue(this.data.name) : null;
    this.data.gruppe ? this.gruppen.patchValue(this.data.gruppe) : null;
    this.data.date_Begin ? this.date.patchValue(this.data.date_Begin) : null;
    this.data.date_Begin ? this.start.patchValue(this.makeTime(this.data.date_Begin)) : null;
    this.data.date_End ? this.end.patchValue(this.makeTime(this.data.date_End)) : null;
    this.account.eMail ? this.email.patchValue(this.account.eMail) : null;
    this.account.password ? this.password.patchValue(this.account.password) : null;
    this.data.titel ? this.bezeichnung.patchValue(this.data.titel) : null;
    this.data.beschreibung ? this.bezeichnung.patchValue(this.data.beschreibung) : null;
    this.veranstaltungsgruppen ? this.gruppen.patchValue(this.veranstaltungsgruppen) : null;
    this.data.gruppe ? this.sgruppe.patchValue(this.data.gruppe) : null;
    this.data.dozentId ? this.vdozent.patchValue(this.data.dozentId) : null;
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
      'sgruppe': new FormControl('', Validators.required),
      'vdozent': new FormControl('', Validators.required)
    });
  }

  makeTime(date: Date) {
    date = new Date(date);
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
    bool ? this.vdozent.disable() : this.vdozent.enable();
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
    for (const s of this.subscriptions)
      s.unsubscribe();
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
        const start = new Date(this.date.value);
        start.setHours(this.start.value.split(':')[0]);
        start.setMinutes(this.start.value.split(':')[1]);
        const end = new Date(this.date.value);
        end.setHours(this.end.value.split(':')[0]);
        end.setMinutes(this.end.value.split(':')[1]);
        console.log(start, end);
        if (mode == 'create') {
          this.veranstaltung.titel = this.bezeichnung.value;
          this.veranstaltung.date_Begin = start;
          this.veranstaltung.date_End = end;
          this.veranstaltung.dozentId = this.vdozent.value;
          this.veranstaltung.anmerkung = '';
        }
        if (mode == 'edit') {
          this.data.date_Begin = start;
          this.data.date_End = end;
          this.data.Datum = new Date(this.date.value);
          this.data.dozentId = this.vdozent.value;
          this.data.titel = this.bezeichnung.value;
          console.log("EDIT:");
          console.log(this.data);
        }
        break;
      case 2:
        this.getAccountValues(this.dozent, mode);
        break;
      case 3:
        this.getAccountValues(this.admin, mode);
        break;
      case 4:
        this.data.beschreibung = this.bezeichnung.value;
        break;
    }
  }

  getAccountValues(data: any, mode: string) {
    this.account.eMail = this.email.value;
    this.account.password = this.password.value;
    if (mode == 'edit')
      this.data.name = this.name.value;
    if (mode == 'create')
      data.name = this.name.value;
  }

  setVeranstaltungsgruppen() {
    this.deleteVeranstaltungsgruppen();
    this.subscriptions.push(this.dataService.veranstaltungClient.getAll().subscribe(data => {
      console.log("GRUPPEN: "+data);

      const ids: number[] = [];
      for (const v of data)
        ids.push(v.id);
      const vg: Veranstaltungsgruppe = {} as Veranstaltungsgruppe;
      for (const g_id of this.gruppen.value) {
        vg.gruppe = g_id;
        this.data === -1 ? vg.veranstaltung = Math.max(...ids) : vg.veranstaltung = this.data.id;
        this.dataService.veranstaltungsgruppeClient.create(0, vg);
      }
    }));
  }

  deleteVeranstaltungsgruppen() {
    for (const id of this.veranstaltungsgruppenIds)
      this.dataService.veranstaltungsgruppeClient.delete(id);
  }

  save() {
    this.getFormData('edit');
    this.disableForm(true);
    if (this.type == 0)
      this.dataService.studentClient.update(this.data.id, this.data);
    if (this.type == 1) {
      this.dataService.veranstaltungClient.update(this.data.id, this.data);
      this.setVeranstaltungsgruppen();
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
      console.log(this.veranstaltung);
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
      this.dataService.studentClient.delete(this.data.id);
    if (this.type == 1) {
      this.deleteVeranstaltungsgruppen();
      this.dataService.veranstaltungClient.delete(this.data.id);
    }
    if (this.type == 2)
      this.dataService.dozentClient.delete(this.data.id);
    if (this.type == 3)
      this.dataService.adminClient.delete(this.data.id);
    if (this.type == 4)
      this.dataService.gruppeClient.delete(this.data.id);
    this.close.emit();
  }

}
