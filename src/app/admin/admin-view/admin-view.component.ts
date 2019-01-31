import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {

  tabs = ["Studenten", "Veranstaltungen", "Dozent", "Admin", "Gruppen"];
  selectedTab: number = 0;
  selectedItem: any;

  constructor() { }

  ngOnInit() {
    this.selectedItem = null;
  }

  setSelectedItem(item: any){
    this.selectedItem = null;
    this.selectedItem = item;
  }

}
