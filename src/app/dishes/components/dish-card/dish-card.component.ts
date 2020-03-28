import { Component, OnInit } from '@angular/core';
import { PopupableService } from 'src/app/core/popupable/popupable.service';
import { DishDetailsComponent } from '../dish-details/dish-details.component';
import { RecentItemService } from '../../recent-items/recent-item.service';

@Component({
  selector: 'r-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss']
})
export class DishCardComponent implements OnInit {

  constructor(
    private popupableService: PopupableService,
    private recentService: RecentItemService
  ) { }

  ngOnInit(): void {
  }

  public onDishClick(): void {
    this.popupableService.open<any, any, any>(DishDetailsComponent, {})
      .subscribe(res => {
        this.recentService.add('' + new Date().getTime())
      })

  }
}
