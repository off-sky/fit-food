import { Component, OnInit } from '@angular/core';
import { PopupableService } from 'src/app/core/popupable/popupable.service';
import { DishDetailsComponent } from '../dish-details/dish-details.component';
import { RecentItemService } from '../../recent-items/recent-item.service';
import { ToastService } from 'src/app/core/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'r-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss']
})
export class DishCardComponent implements OnInit {

  public addedToFav = false;

  constructor(
    private popupableService: PopupableService,
    private recentService: RecentItemService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  public onDishClick(): void {
    this.popupableService.open<any, any, any>(DishDetailsComponent, {})
      .subscribe(res => {
        this.recentService.add('' + new Date().getTime())
      })
  }

  public onAddToFav(): void {
    this.addedToFav = !this.addedToFav;
    if (this.addedToFav) {
      this.toastService.openToast('Додано до улюблених');
    } else {
      this.toastService.openToast('Видалено з улюблених');
    }
  }

  public onAddToCalendar(): void {
    this.router.navigate(['dishes', 'add-to-calendar', '123']);
  }
}
