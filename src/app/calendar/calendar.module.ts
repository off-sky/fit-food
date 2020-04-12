import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRootComponent } from './containers/calendar-root/calendar-root.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [CalendarRootComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CalendarModule { }
