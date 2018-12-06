import { Component, OnInit } from '@angular/core';
import { StatService } from '../stat.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  userNumbers: LineChartData[];

  constructor(private StatsService: StatService) { }

  ngOnInit() {
    this.generateData();
  }

  generateData() {
    this.userNumbers = this.StatsService.generateUserNumbers();
  }
}