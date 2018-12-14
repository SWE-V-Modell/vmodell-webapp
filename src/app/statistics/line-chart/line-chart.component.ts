import { Component, OnInit, Input } from '@angular/core';
import * as shape from 'd3-shape';
@Component({
  selector: 'app-stat-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input() data: any;
  @Input() references: [{ name, value }];
  @Input() xAxis: string;
  @Input() yAxis: string;
  @Input() color: string;

  showXAxisLabel = true;
  showYAxisLabel = true;
  lineChartColorScheme;
  lineChartLineInterpolation = shape.curveBasis;


  constructor() {
  }

  ngOnInit() {
    if (!this.xAxis) this.showXAxisLabel = false;
    if (!this.yAxis) this.showYAxisLabel = false;
    this.lineChartColorScheme = { domain: [] };
    for (const data of this.data)
      this.lineChartColorScheme.domain.push(data.color);
  }


  onSelect(event) {
    console.log(event);
  }
}
