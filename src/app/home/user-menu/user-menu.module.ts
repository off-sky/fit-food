import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserMenuDropdownComponent } from './user-menu-dropdown/user-menu-dropdown.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [UserMenuComponent, UserMenuDropdownComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    UserMenuComponent
  ]
})
export class UserMenuModule { }
