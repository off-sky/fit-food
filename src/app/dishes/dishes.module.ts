import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishListRootComponent } from './containers/dish-list-root/dish-list-root.component';
import { DishCardComponent } from './components/dish-card/dish-card.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DishListRootComponent,
    DishCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DishesModule { }
