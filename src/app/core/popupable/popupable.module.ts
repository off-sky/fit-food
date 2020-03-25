import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupableComponent } from './popupable/popupable.component';
import { WidgetMenuModule } from './widget-menu/widget-menu.module';



@NgModule({
  declarations: [PopupableComponent],
  imports: [
    CommonModule,
    WidgetMenuModule
  ],
  exports: [
    PopupableComponent
  ]
})
export class PopupableModule { }
