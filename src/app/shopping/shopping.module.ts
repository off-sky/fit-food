import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingRootComponent } from './containers/shopping-root/shopping-root.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ShoppingRootComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ShoppingModule { }
