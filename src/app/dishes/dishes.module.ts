import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishListRootComponent } from './containers/dish-list-root/dish-list-root.component';
import { DishCardComponent } from './components/dish-card/dish-card.component';
import { SharedModule } from '../shared/shared.module';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { RecentItemsModule } from './recent-items/recent-items.module';
import { AddToCalendarComponent } from './containers/add-to-calendar/add-to-calendar.component';



@NgModule({
  declarations: [
    DishListRootComponent,
    DishCardComponent,
    DishDetailsComponent,
    AddToCalendarComponent
  ],
  entryComponents: [
    DishDetailsComponent
  ],
  imports: [
    CommonModule,
    RecentItemsModule,
    SharedModule
  ]
})
export class DishesModule { }
