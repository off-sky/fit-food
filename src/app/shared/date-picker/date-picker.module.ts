import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ArrowComponent } from './arrow/arrow.component';



@NgModule({
  declarations: [DatePickerComponent, ArrowComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DatePickerComponent
  ]
})
export class DatePickerModule { }
