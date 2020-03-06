import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishListRootComponent } from './containers/dish-list-root/dish-list-root.component';



@NgModule({
  declarations: [DishListRootComponent],
  imports: [
    CommonModule
  ]
})
export class DishesModule { }
