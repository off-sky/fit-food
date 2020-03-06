import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ScreenSizeModule } from './screen-size/screen-size.module';



@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    ScreenSizeModule
  ],
  exports: [
    ScreenSizeModule
  ]
})
export class CoreModule { }
