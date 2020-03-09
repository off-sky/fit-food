import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { FilterItemComponent } from './filter-item/filter-item.component';



@NgModule({
  declarations: [
    FilterBarComponent,
    FilterItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterBarComponent,
    FilterItemComponent
  ]
})
export class FilterBarModule { }
