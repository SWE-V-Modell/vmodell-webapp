import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../shared/material.module';
import { RouterModule, Routes } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
const routes: Routes = [
  { path: '', component: StatisticsComponent }
]
// https://github.com/swimlane/ngx-charts/blob/master/demo/combo-chart/combo-series-vertical.component.ts
@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class StatisticsModule { }
