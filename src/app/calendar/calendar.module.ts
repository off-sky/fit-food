import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarRootComponent } from "./containers/calendar-root/calendar-root.component";
import { SharedModule } from "../shared/shared.module";
import { DayDetailsComponent } from "./containers/day-details/day-details.component";
import { DayRootComponent } from "./containers/day-root/day-root.component";
import { DayEditorComponent } from "./containers/day-editor/day-editor.component";
import { RouterModule } from '@angular/router';
import { NoDishesForDayComponent } from './components/no-dishes-for-day/no-dishes-for-day.component';
import { DishItemDisplayComponent } from './components/dish-item-display/dish-item-display.component';
import { DishItemEditComponent } from './components/dish-item-edit/dish-item-edit.component';
import { SelectDishComponent } from './containers/select-dish/select-dish.component';
import { DishSelectorModule } from '../shared/dish-selector/dish-selector.module';
import { ActionsModule } from '../shared/actions/actions.module';

@NgModule({
  declarations: [
    CalendarRootComponent,
    DayDetailsComponent,
    DayRootComponent,
    DayEditorComponent,
    NoDishesForDayComponent,
    DishItemDisplayComponent,
    DishItemEditComponent,
    SelectDishComponent,
  ],
  imports: [ActionsModule, CommonModule, RouterModule, SharedModule, DishSelectorModule],
})
export class CalendarModule {}
