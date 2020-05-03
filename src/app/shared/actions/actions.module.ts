import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './actions/actions.component';
import { ActionsMobileComponent } from './actions-mobile/actions-mobile.component';
import { ActionsDesktopComponent } from './actions-desktop/actions-desktop.component';



@NgModule({
  declarations: [ActionsComponent, ActionsMobileComponent, ActionsDesktopComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ActionsComponent
  ]
})
export class ActionsModule { }
