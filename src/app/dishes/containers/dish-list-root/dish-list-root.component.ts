import { Component, OnInit } from '@angular/core';
import { PopupableService } from 'src/app/core/popupable/popupable.service';
import { DishDetailsComponent } from '../../components/dish-details/dish-details.component';
import { Observable } from 'rxjs';
import { ScreenSizeService } from 'src/app/core/screen-size/screen-size.service';
import { ScreenSizes } from 'src/app/core/screen-size/interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'r-dish-list-root',
  templateUrl: './dish-list-root.component.html',
  styleUrls: ['./dish-list-root.component.scss']
})
export class DishListRootComponent implements OnInit {

  public isMobile$: Observable<boolean>;
  public filters = [
    "Улюблені",
    "Снеки",
    "Сніданки",
    "На обід",
    "На вечерю"
  ];

  constructor(
    private popupableService: PopupableService,
    private screenSizeService: ScreenSizeService
    ) { }

  ngOnInit(): void {
    this.isMobile$ = this.screenSizeService.screenSize$()
      .pipe(
        map(size => size === ScreenSizes.MOBILE)
      )
  }

  public onOpenedFromRecentList(): void {
    this.popupableService.open<any, any, any>(DishDetailsComponent, {})
      .subscribe(res => {
      });
  }

}
