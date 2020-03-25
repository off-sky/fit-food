import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetMenuComponent } from './widget-menu/widget-menu.component';

@NgModule({
  declarations: [
    WidgetMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WidgetMenuComponent
  ]
})
export class WidgetMenuModule { }
