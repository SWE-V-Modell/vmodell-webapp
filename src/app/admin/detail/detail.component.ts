import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  @Input() id: number;
  @Input() type: number;
  
  form= new FormGroup({
    'name': new FormControl('', Validators.required),
    'module': new FormControl('', Validators.required),
    'date': new FormControl('', Validators.required),
    'start': new FormControl('', Validators.required),
    'end': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
  });
  disabled: boolean = true;
  modul;

  get name() { return this.form.get('name'); }
  get module() { return this.form.get('module'); }
  get date() { return this.form.get('date'); }
  get start() { return this.form.get('start'); }
  get end() { return this.form.get('end'); }
  get email() { return this.form.get('email'); }

  ngOnInit() {
    this.disableForm(true);
  }

  disableForm(bool: boolean){
    bool ? this.name.disable() : this.name.enable();
    bool ? this.module.disable() : this.module.enable();
    bool ? this.date.disable() : this.date.enable();
    bool ? this.start.disable() : this.start.enable();
    bool ? this.end.disable() : this.end.enable();
    bool ? this.email.disable() : this.email.enable();
    this.disabled = bool;
  }

}
