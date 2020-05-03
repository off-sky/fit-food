import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DishSelectorComponent } from "./dish-selector/dish-selector.component";
import { ListItemComponent } from "./list-item/list-item.component";
import { DishDetailsComponent } from "./dish-details/dish-details.component";
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    DishSelectorComponent,
    ListItemComponent,
    DishDetailsComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    DishSelectorComponent
  ],
  entryComponents: [
    DishDetailsComponent
  ]
})
export class DishSelectorModule {}
