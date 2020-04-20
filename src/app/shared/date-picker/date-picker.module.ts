import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ArrowComponent } from './arrow/arrow.component';
import { RoundFillIndicatorComponent } from '../components/round-fill-indicator/round-fill-indicator.component';



@NgModule({
  declarations: [
    DatePickerComponent,
    ArrowComponent,
    RoundFillIndicatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatePickerComponent
  ]
})
export class DatePickerModule { }
