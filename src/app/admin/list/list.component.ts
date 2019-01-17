import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {

  @Input() type: number;
  @Output() selectedItem = new EventEmitter<any>();

  test = [{
    id: 1,
    farbe:'rot'
  },{
    id: 2,
    farbe: 'orange'
  }, {
    id: 3,
    farbe: 'gelb'
  }, {
    id:4,
    farbe:'grün' 
  }, {
    id: 5,
    farbe: 'blau'
  }, {
    id: 6,
    farbe: 'braun'
  }, {
    id: 7,
    farbe: 'violett'
  }, {
    id: 8,
    farbe: 'rosa'
  },{
    id: 9,
    farbe: 'schwarz'
  }, {
    id: 10,
    farbe: 'weiß'
  }, {
    id: 11,
    farbe:'türkis'
  }, {
    id: 12,
    farbe: 'lila'
  }, {
    id: 13,
    farbe: 'pink'
  }, {
    id: 14,
    farbe: 'magenta'
  }];
  searchedSet = [];
  selectedIndex: number;
  searchStr: string = "";

  constructor() { }

  ngOnInit() {
    this.searchedSet = this.test;
    this.selectedIndex = null;
    this.searchStr = "";
  }

  ngOnChanges(){this.ngOnInit()}

  search(){
    this.searchedSet = this.test.filter(t => t.farbe.includes(this.searchStr));
  }
  chooseItem(index: number, item: any){
    this.selectedIndex = index;
    this.selectedItem.emit(item);
  }

}
