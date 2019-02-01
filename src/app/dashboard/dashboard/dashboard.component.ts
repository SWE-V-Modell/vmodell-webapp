import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../../shared/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tabs = ['Vergangene Veranstaltungen', 'Diese Woche', 'Bevorstehende Veranstaltungen'];
  selectedTab: number = 0;
  selectedItem: any;

  termine: Veranstaltung[] = [];

  constructor(private dataService: DataService) { }


  ngOnInit() {
    this.selectedItem = null;
    this.dataService.veranstaltungClient.getAll().subscribe( data => {
      this.termine = data;
      console.log(this.termine);

      console.log(this.filter(1));
    });
  }


  setSelectedItem(item: any){
    this.selectedItem = null;
    this.selectedItem = item;
  }

  // Filtert alle Termine nach Kalenderwoche.
  // Der Typ gibt an wie gefiltert werden soll (-1: vergangene, 0 diese, 1: kommende),
  // es wird immer nur das aktuelle Jahr berücksichtigt.
  //
  // TODO:
  // SORTIEREN NACH DATUM!!!
  filter(type: number) {
    const date = new Date(Date.now());
    switch (type) {
      case 0:
        return this.termine.filter(t => this.getWeek(new Date(t.date_Begin)) < this.getWeek(date));
      case 1:
        return this.termine.filter(t => this.getWeek(new Date(t.date_Begin)) === this.getWeek(date));
      case 2:
        return this.termine.filter(t => this.getWeek(new Date(t.date_Begin)) > this.getWeek(date));
    }
  }

  // Gibt die Kalenderwoche des übergebenen Datums zurück
  getWeek(date: any) {
    const onejan: any = new Date(new Date(date).getFullYear(), 0, 1);
    return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  }

}
