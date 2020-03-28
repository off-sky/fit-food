import { Component, OnInit } from '@angular/core';
import { PopupableService } from 'src/app/core/popupable/popupable.service';
import { DishDetailsComponent } from '../../components/dish-details/dish-details.component';

@Component({
  selector: 'r-dish-list-root',
  templateUrl: './dish-list-root.component.html',
  styleUrls: ['./dish-list-root.component.scss']
})
export class DishListRootComponent implements OnInit {

  public filters = [
    "Улюблені",
    "Снеки",
    "Сніданки",
    "На обід",
    "На вечерю"
  ];

  constructor(private popupableService: PopupableService) { }

  ngOnInit(): void {
  }

  public onOpenedFromRecentList(): void {
    this.popupableService.open<any, any, any>(DishDetailsComponent, {})
      .subscribe(res => {
      })
  }

}
