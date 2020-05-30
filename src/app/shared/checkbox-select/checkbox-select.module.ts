import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxSelectComponent } from './checkbox-select/checkbox-select.component';
import { CheckboxSelectItemComponent } from './checkbox-select-item/checkbox-select-item.component';



@NgModule({
  declarations: [
    CheckboxSelectComponent,
    CheckboxSelectItemComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CheckboxSelectComponent,
    CheckboxSelectItemComponent
  ]
})
export class CheckboxSelectModule { }
