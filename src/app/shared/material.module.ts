import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule, MatCheckboxModule, MatCardModule, MatIconModule,
  MatFormFieldModule, MatListModule, MatRadioModule, MatSelectModule,
  MatSidenavModule, MatSlideToggleModule, MatSortModule, MatToolbarModule,
  MatTableModule, MatPaginatorModule, MatStepperModule, MatInputModule,
  MatAutocompleteModule, MatButtonToggleModule, MatDatepickerModule,
  MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule,
  MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatSliderModule, MatTabsModule, MatTooltipModule, MatChipsModule, MAT_DATE_FORMATS, NativeDateAdapter, DateAdapter
} from '@angular/material';

const MY_DATE_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

export class GermanDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat != 'input')
      return date.toDateString();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return this._to2digit(day) + '.' + this._to2digit(month) + '.' + year;
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatIconModule,
    MatFormFieldModule, MatListModule, MatRadioModule, MatSelectModule,
    MatSidenavModule, MatSlideToggleModule, MatSortModule, MatToolbarModule,
    MatTableModule, MatPaginatorModule, MatStepperModule, MatInputModule,
    MatAutocompleteModule, MatButtonToggleModule, MatDatepickerModule,
    MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule,
    MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatSliderModule, MatTabsModule, MatTooltipModule, MatChipsModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule, MatCardModule, MatIconModule,
    MatFormFieldModule, MatListModule, MatRadioModule, MatSelectModule,
    MatSidenavModule, MatSlideToggleModule, MatSortModule, MatToolbarModule,
    MatTableModule, MatPaginatorModule, MatStepperModule, MatInputModule,
    MatAutocompleteModule, MatButtonToggleModule, MatDatepickerModule,
    MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule,
    MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatSliderModule, MatTabsModule, MatTooltipModule, MatChipsModule
  ],
  providers: [
    { provide: DateAdapter, useClass: GermanDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class MaterialModule { }
