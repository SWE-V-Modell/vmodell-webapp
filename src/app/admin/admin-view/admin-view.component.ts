import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {

  tabs = ["Benutzer", "Kurs", "Dozent"];
  selectedTab: number = 0;
  selectedItem: any;

  constructor() { }

  ngOnInit() {
    this.selectedItem = null;
  }

  setSelectedItem(item: any){
    this.selectedItem = item;
    console.log(this.selectedItem);
  }

}
