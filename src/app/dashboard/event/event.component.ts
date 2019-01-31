import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() termin : Veranstaltung;
  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.termin);
  }

  getDate(begin: Date, end: Date): String {
    return begin.getDate() + "." + (begin.getUTCMonth()+1) + "." + begin.getUTCFullYear() + " (" + begin.toTimeString().substring(0,5) + " - " + end.toTimeString().substring(0, 5) + ")";
  }

  showDetail() {
    this.router.navigateByUrl('/veranstaltung/edit/' + this.termin.id);
  }

  //getTime()
}
