import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingRootComponent } from './containers/shopping-root/shopping-root.component';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListItemComponent } from './containers/shopping-list-item/shopping-list-item.component';
import { ActionsModule } from '../shared/actions/actions.module';



@NgModule({
  declarations: [ShoppingRootComponent, ShoppingListItemComponent],
  imports: [
    ActionsModule,
    CommonModule,
    SharedModule
  ]
})
export class ShoppingModule { }
