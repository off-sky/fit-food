import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ScreenSizeModule } from './screen-size/screen-size.module';
import { PopupableModule } from './popupable/popupable.module';



@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    ScreenSizeModule,
    PopupableModule
  ],
  exports: [
    ScreenSizeModule,
    PopupableModule
  ]
})
export class CoreModule { }
