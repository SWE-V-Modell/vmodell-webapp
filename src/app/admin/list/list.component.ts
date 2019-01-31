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
  gruppes: Gruppe[];
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
        this.subscription = this.data.getAllGruppes().subscribe(data => {
          this.gruppes = data;
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
      case 3:
        this.subscription = this.data.getAllAdmins().subscribe(data => {
          this.dataArray = data;
          this.searchedSet = data;
        });
        break;
      case 4:
        this.subscription = this.data.getAllGruppes().subscribe(data => {
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
    try {
      this.searchedSet = this.dataArray.filter(t => t.Name.includes(this.searchStr));

    } catch (e) {
      try {
        this.searchedSet = this.dataArray.filter(t => t.Beschreibung.includes(this.searchStr));
      } catch (e) { }
    }

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
}
