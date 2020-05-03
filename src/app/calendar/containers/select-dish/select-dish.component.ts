import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as fromTypes from '../../../../types';
import { RouterService } from 'src/app/core/services/router.service';
import { Action, ActionColors } from 'src/app/shared/actions';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DayDetailsStoreService } from '../../services/day-details-store.service';

@Component({
  selector: 'r-select-dish',
  templateUrl: './select-dish.component.html',
  styleUrls: ['./select-dish.component.scss']
})
export class SelectDishComponent implements OnInit {

  public actions$: Observable<Action[]>;
  public title: string;
  private mealId: number;

  private selectedDishSubj: BehaviorSubject<number> = new BehaviorSubject<number>(null);


  constructor(
    private route: ActivatedRoute,
    private routerService: RouterService,
    private store: DayDetailsStoreService
  ) { }

  ngOnInit(): void {
    const momentId = this.route.parent.snapshot.params.dayId;
    const moment = fromTypes.utils.getMomentFromId(momentId);
    const displayDate = moment.format('MMM DD, YYY');

    const mealId = this.route.snapshot.params.mealId;
    this.mealId = parseInt(mealId, 10);
    const displayMeal = fromTypes.utils.getMealNameById(this.mealId);
    this.title = `${displayMeal} for ${displayDate}`;

    this.actions$ = of([
      {
        displayLabel: 'Cancel',
        callback: this.cancelFn.bind(this),
        disabled: false,
        color: ActionColors.WHITE
      }
    ]);
  }

  public onDishSelectedChanged(dish: number): void {
    this.selectedDishSubj.next(dish);
    this.onDishSelectFn();
  }

  public onDishSelectFn(): void {
    this.store.addDish(this.selectedDishSubj.value, this.mealId);
    this.routerService.dayDetails(this.route.parent.snapshot.params.dayId)
  }

  public onBack(): void {
    this.routerService.dayDetails(this.route.parent.snapshot.params.dayId);
  }

  private cancelFn(): void {
    this.onBack();
  }

}
