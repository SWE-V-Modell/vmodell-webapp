import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { StatisticsComponent } from './statistics/statistics.component';
import { MaterialModule } from '../shared/material.module';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: StatisticsComponent }
]

@NgModule({
  declarations: [
    StatisticsComponent,
    LineChartComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    MaterialModule,
    RouterModule.forChild(routes),
    NgxChartsModule
  ]
})
export class StatisticsModule { }
