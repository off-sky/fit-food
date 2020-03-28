import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupableComponent } from './popupable/popupable.component';
import { WidgetMenuModule } from './widget-menu/widget-menu.module';
import { PopupComponent } from './popup/popup.component';



@NgModule({
  declarations: [PopupableComponent, PopupComponent ],
  imports: [
    CommonModule,
    WidgetMenuModule
  ],
  exports: [
    PopupableComponent
  ]
})
export class PopupableModule { }
