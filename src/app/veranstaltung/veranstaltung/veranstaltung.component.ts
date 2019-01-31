import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/data.service';

@Component({
  selector: 'app-veranstaltung',
  templateUrl: './veranstaltung.component.html',
  styleUrls: ['./veranstaltung.component.scss']
})
export class VeranstaltungComponent implements OnInit {

  tabs = ['Meine Veranstaltungen', 'Alle Veranstaltungen'];
  selectedTab: number = 0;
  selectedItem: any;

  veranstaltungen: Veranstaltung[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.selectedItem = null;
    this.dataService.veranstaltungClient.getAll().subscribe( data => {
      this.veranstaltungen = data;
      console.log(this.veranstaltungen);
    });
  }

  setSelectedItem(item: any){
    this.selectedItem = null;
    this.selectedItem = item;
  }

  filterEvent(id: number): Veranstaltung[] {
    if(this.veranstaltungen == null) return;
    switch (id) {
      case 0:
        console.log(this.veranstaltungen);
        return this.veranstaltungen.filter( v =>  v.dozentId === 5);
      case 1:
        return this.veranstaltungen;
    }
  }
}
