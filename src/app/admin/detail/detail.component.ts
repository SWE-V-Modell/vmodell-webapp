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
  modul;
  subscription: Subscription;

  constructor(private dataServ: AdminDataService){}

  get name() { return this.form.get('name'); }
  get module() { return this.form.get('module'); }
  get date() { return this.form.get('date'); }
  get start() { return this.form.get('start'); }
  get end() { return this.form.get('end'); }
  get email() { return this.form.get('email'); }

  ngOnChanges(){
    this.initializeEmptyForm();
    this.subscription = this.dataServ.getAllModuls().subscribe(data => this.modul = data);
    if(this.data != -1){
      this.disableForm(true);
      this.patchValue();   
      this.disabled = true;
      this.createmod = false;
    }else{
      this.disabled = false;
      this.createmod = true;
    }
      
  }

  patchValue(){
    this.data.Name ? this.name.patchValue(this.data.Name) : null;
    this.data.Modul ? this.module.patchValue(this.data.Modul) : null;
    this.data.Datum ? this.date.patchValue(this.data.Datum) : null;
    this.data.Von ? this.start.patchValue(this.makeTime(this.data.Von)) : null;
    this.data.Bis ? this.end.patchValue(this.makeTime(this.data.Bis)) : null;
    this.data.EMail ? this.email.patchValue(this.data.EMail) : null;
  }

  initializeEmptyForm(){
    this.form = new FormGroup({
      'name': new FormControl('', Validators.required),
      'module': new FormControl('', Validators.required),
      'date': new FormControl('', Validators.required),
      'start': new FormControl('', Validators.required),
      'end': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
    });
  }

  makeTime(date: Date){
    return date.getHours() + ':' + date.getMinutes();
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

  isFormValid(){
    try{
       if((this.type == 0 && !this.name.invalid) || (this.type == 1 && !this.modul.invalid && !this.date.invalid && !this.start.invalid && !this.end.invalid) || (this.type == 2 && !this.name.invalid && !this.email.invalid))
        return true;
    }catch(e){
      return false;
    }
    return false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  cancel(){
    if(this.createmod)
      this.close.emit();
    else{
      this.disableForm(true); 
      this.disabled = true;
    }   
  }

}
