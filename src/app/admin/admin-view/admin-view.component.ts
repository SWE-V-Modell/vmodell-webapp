import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {

  tabs = ["Benutzer", "Kurs", "Dozent"];
  selectedTab: number = 0;

  constructor() { }

  ngOnInit() {
    console.log(this.tabs)
  }

}
