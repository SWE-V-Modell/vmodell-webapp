import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  termine: any;

  ngOnInit() {
  }

  //Filtert alle Termine nach Kalenderwoche. 
  //Der Typ gibt an wie gefiltert werden soll (-1: vergangene, 0 diese, 1: kommende), 
  //es wird immer nur das aktuelle Jahr berücksichtigt.
  filter(type: number) {
    let date = new Date(Date.now());
    switch (type) {
      case -1:
        return this.termine.filter(t => this.getWeek(t.datum) < this.getWeek(date));
      case 0:
        return this.termine.filter(t => this.getWeek(t.datum) === this.getWeek(date));
      case 1:
        return this.termine.filter(t => this.getWeek(t.datum) > this.getWeek(date));
    }
  }

  //Gibt die Kalenderwoche des übergebenen Datums zurück
  getWeek(date: any) {
    let onejan: any = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  }

}
