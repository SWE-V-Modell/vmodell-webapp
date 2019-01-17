import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AdminDataService } from '../admin-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() type: number;
  @Output() selectedItem = new EventEmitter<any>();

  dataArray: any;
  moduls: Modul[];
  searchedSet = [];
  selectedIndex: number;
  searchStr: string = "";
  subscription: Subscription;
  subscription2: Subscription;

  constructor(private data: AdminDataService) { }

  ngOnInit() {
    switch (this.type) {
      case 0:
        this.subscription = this.data.getAllStudents().subscribe(data => {
          this.dataArray = data;
          this.searchedSet = data;
        });
        break;
      case 1:
        this.subscription = this.data.getAllModuls().subscribe(data => {
          this.moduls = data;
          this.subscription2 = this.data.getAllVeranstaltungs().subscribe(data => {
            this.dataArray = data;
            this.searchedSet = data;
          });
        });
        break;
      case 2:
        this.subscription = this.data.getAllDozents().subscribe(data => {
          this.dataArray = data;
          this.searchedSet = data;
        });
        break;
    }
    this.selectedIndex = null;
    this.searchStr = "";
  }
  ngOnChanges() { this.ngOnInit() }
  search() {
    //Kurse auch suchbar machen
    this.searchedSet = this.dataArray.filter(t => t.Name.includes(this.searchStr));
  }
  chooseItem(index: number, item: any) {
    this.selectedIndex = index;
    this.selectedItem.emit(item);
  }
  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
    if (this.subscription2)
      this.subscription2.unsubscribe();
  }
  getVeranstaltungName(veranstaltung: Veranstaltung) {
    if (veranstaltung.Modul) {
      let modul = this.moduls.find(m => m.Id == veranstaltung.Modul);
      return {Beschreibung: modul.Beschreibung + ', ', Datum: veranstaltung.Datum };
    }
  }
}
