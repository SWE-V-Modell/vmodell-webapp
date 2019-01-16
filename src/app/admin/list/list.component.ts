import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {

  @Input() type: number;

  test = ['rot', 'orange', 'gelb', 'grün', 'blau', 'braun', 'violett', 'rosa', 'schwarz', 'weiß', 'türkis', 'lila', 'pink', 'magenta'];
  searchedSet = [];
  selectedIndex: number;
  searchStr: string = "";

  constructor() { }

  ngOnInit() {
    console.log(this.type)
    this.searchedSet = this.test;
    this.selectedIndex = null;
    this.searchStr = "";
  }

  ngOnChanges(){this.ngOnInit()}

  search(){
    this.searchedSet = this.test.filter(t => t.includes(this.searchStr));
  }

}
