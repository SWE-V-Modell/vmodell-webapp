import { Component, OnInit, ViewContainerRef } from '@angular/core';

class Veranstaltung {
  id: number;
  title: String;
  modul: number;
  begin: Date;
  end: Date;
  description: String;

  constructor(id: number, title: String, modul: number, begin: Date, end:Date, description: String)
  {
    this.id = id;
    this.title = title;
    this.modul = modul;
    this.begin = begin;
    this.end = end;
    this.description = description;
  }
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  termine: Veranstaltung[] = [];

  ngOnInit() {
    this.termine.push(new Veranstaltung(1, 'Software Engineering', 1, new Date('2019-01-04T13:30:00'), new Date('2019-01-04T16:45:00'), "Projektvorstellung der Gruppen 3 und 4."));
    this.termine.push(new Veranstaltung(2, 'Human Ressources', 1, new Date('2019-01-24T13:30:00'), new Date('2019-01-24T16:45:00'), ""));
    this.termine.push(new Veranstaltung(3, 'Controlling', 1,  new Date('2019-01-25T13:30:00'), new Date('2019-01-25T16:45:00'), "Denkt bitte an die Aufgaben 8-9"));
    this.termine.push(new Veranstaltung(4, 'IT-Management', 1,  new Date('2019-01-31T13:30:00'), new Date('2019-01-31T16:45:00'), "Wir beginnen schon um 13:15!!"));
    console.log(this.termine);
  }

  //Filtert alle Termine nach Kalenderwoche. 
  //Der Typ gibt an wie gefiltert werden soll (-1: vergangene, 0 diese, 1: kommende), 
  //es wird immer nur das aktuelle Jahr berücksichtigt.
  //
  //TODO:
  //SORTIEREN NACH DATUM!!!
  filter(type: number) {
    let date = new Date(Date.now());
    switch (type) {
      case -1:
        return this.termine.filter(t => this.getWeek(t.begin) < this.getWeek(date));
      case 0:
        return this.termine.filter(t => this.getWeek(t.begin) === this.getWeek(date));
      case 1:
        return this.termine.filter(t => this.getWeek(t.begin) > this.getWeek(date));
    }
  }

  //Gibt die Kalenderwoche des übergebenen Datums zurück
  getWeek(date: any) {
    let onejan: any = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  }

}
