import { Component, OnInit } from '@angular/core';
import { StatService } from '../stat.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  userNumbers: LineChartData[];
  mapData: any;

  constructor(private statsService: StatService) { }

  ngOnInit() {
    this.generateData();
    this.generateMapData();
  }

  generateData() {
    this.userNumbers = this.statsService.generateUserNumbers();
  }

  generateMapData() {
    this.mapData = this.statsService.generateMap(45);
  }

  refresh() {
    this.generateData();
    this.generateMapData();
  }
}