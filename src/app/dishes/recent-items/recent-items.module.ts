import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentItemComponent } from './recent-item/recent-item.component';
import { RecentListComponent } from './recent-list/recent-list.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [RecentItemComponent, RecentListComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RecentListComponent
  ]
})
export class RecentItemsModule { }
