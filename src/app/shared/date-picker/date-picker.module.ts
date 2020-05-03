import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ArrowComponent } from './arrow/arrow.component';
import { RoundFillIndicatorComponent } from '../components/round-fill-indicator/round-fill-indicator.component';
import { RectangleFillIndicatorComponent } from '../components/rectangle-fill-indicator/rectangle-fill-indicator.component';
import { DropFillIndicatorComponent } from '../components/drop-fill-indicator/drop-fill-indicator.component';



@NgModule({
  declarations: [
    DatePickerComponent,
    ArrowComponent,
    DropFillIndicatorComponent,
    RoundFillIndicatorComponent,
    RectangleFillIndicatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatePickerComponent
  ]
})
export class DatePickerModule { }
