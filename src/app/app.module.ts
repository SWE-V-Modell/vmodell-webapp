import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ComponentsModule } from './components/components.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { StatisticsModule } from './statistics/statistics.module';
import { VeranstaltungModule } from './veranstaltung/veranstaltung.module';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMaterialTimepickerModule.forRoot(),
    // Style
    MDBBootstrapModule.forRoot(),

    // Modules
    ComponentsModule,
    CoreModule,
    DashboardModule,
    LoginModule,
    StatisticsModule,
    VeranstaltungModule,
    AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
