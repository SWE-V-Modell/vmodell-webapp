import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() termin;
  constructor() { }

  ngOnInit() {
  }

}
