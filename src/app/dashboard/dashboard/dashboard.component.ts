import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../../shared/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataService) { }
  termine: Veranstaltung[] = [];

  ngOnInit() {
    this.dataService.veranstaltungClient.getAll().subscribe( data => {
      this.termine = data;
      console.log(this.termine);
    })

    // this.termine.push({ id: 1, titel: 'Software Engineering', von: new Date('2019-01-04T13:30:00'), bis: new Date('2019-01-04T16:45:00'), anmerkung: "Projektvorstellung der Gruppen 3 und 4."});
    // this.termine.push(new Veranstaltung(2, 'Human Ressources',new Date('2019-01-24T13:30:00'), new Date('2019-01-24T16:45:00'), ""));
    // this.termine.push(new Veranstaltung(3, 'Controlling', new Date('2019-01-25T13:30:00'), new Date('2019-01-25T16:45:00'), "Denkt bitte an die Aufgaben 8-9"));
    // this.termine.push(new Veranstaltung(4, 'IT-Management', new Date('2019-01-31T13:30:00'), new Date('2019-01-31T16:45:00'), "Wir beginnen schon um 13:15!!"));
    
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
        return this.termine.filter(t => this.getWeek(t.von) < this.getWeek(date));
      case 0:
        return this.termine.filter(t => this.getWeek(t.von) === this.getWeek(date));
      case 1:
        return this.termine.filter(t => this.getWeek(t.von) > this.getWeek(date));
    }
  }

  //Gibt die Kalenderwoche des übergebenen Datums zurück
  getWeek(date: any) {
    let onejan: any = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  }

}
