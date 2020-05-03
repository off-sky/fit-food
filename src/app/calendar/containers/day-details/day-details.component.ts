import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as fromTypes from '../../../../types';
import { RouterService } from 'src/app/core/services/router.service';
import { DayDetailsStoreService } from '../../services/day-details-store.service';
import { Observable } from 'rxjs';
import { Action, ActionColors } from 'src/app/shared/actions';
import { map } from 'rxjs/operators';
import { PopupableService } from 'src/app/core/popupable/popupable.service';
import { DishDetailsComponent } from 'src/app/dishes/components/dish-details/dish-details.component';

@Component({
  selector: 'r-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.scss']
})
export class DayDetailsComponent implements OnInit {

  public title: string;
  public meals$: Observable<any[]>;
  public empty$: Observable<boolean>;
  public actions: Action[];

  constructor(
    private popupableService: PopupableService,
    private route: ActivatedRoute,
    private routerService: RouterService,
    private store: DayDetailsStoreService
  ) { }

  ngOnInit(): void {
    const momentId = this.route.parent.snapshot.params.dayId;
    const moment = fromTypes.utils.getMomentFromId(momentId);
    const displayDate = moment.format('MMM DD, YYY');
    this.title = `Menu for ${displayDate}`;
    this.meals$ = this.store.meals$()
      // .pipe(
      //   map(meals => meals.filter(m => !!m.dish))
      // );
    this.empty$ = this.store.empty$();
    this.actions = [
      {
        displayLabel: 'Edit',
        callback: () => this.routerService.dayEdit(this.route.parent.snapshot.params.dayId),
        disabled: false,
        color: ActionColors.ACCENT_BORDER
      }
    ]
  }

  public onDishClick(): void {
    this.popupableService.open<any, any, any>(DishDetailsComponent, {})
      .subscribe(res => {
      });
  }

  public onBack(): void {
    this.routerService.calendar();
  }

  public onNewClicked(): void {
    this.routerService.dayEdit(this.route.parent.snapshot.params.dayId);
  }

  public onMealEditClicked(mealId: number): void {
    this.routerService.mealEdit(this.route.parent.snapshot.params.dayId, mealId);
  }

  public onClearMealClick(mealId: number): void {
    this.store.clearDish(mealId);
  }

}
