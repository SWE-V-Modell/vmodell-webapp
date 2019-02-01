import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() termin: Veranstaltung;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  getDate(begin: Date, end: Date): String {
    return new Date(begin).getDate() + '.' + (new Date(begin).getUTCMonth() + 1) + '.' + new Date(begin).getUTCFullYear() + ' (' + new Date(begin).toTimeString().substring(0, 5) + ' - ' + new Date(end).toTimeString().substring(0, 5) + ')';
  }

  showDetail() {
    this.router.navigateByUrl('/veranstaltung/edit/' + this.termin.id);
  }

  // getTime()
}
