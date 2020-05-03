import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/core/services/router.service';
import { ActivatedRoute } from '@angular/router';
import * as fromTypes from '../../../../types';
import { Observable } from 'rxjs';
import { DayDetailsStoreService } from '../../services/day-details-store.service';
import { Action, ActionColors } from 'src/app/shared/actions';

@Component({
  selector: 'r-day-editor',
  templateUrl: './day-editor.component.html',
  styleUrls: ['./day-editor.component.scss']
})
export class DayEditorComponent implements OnInit {

  public title: string;
  public dishes$: Observable<any[]>;
  public actions: Action[];

  constructor(
    private route: ActivatedRoute,
    private routerService: RouterService,
    private store: DayDetailsStoreService
  ) { }

  ngOnInit(): void {
    const momentId = this.route.parent.snapshot.params.dayId;
    const moment = fromTypes.utils.getMomentFromId(momentId);
    const displayDate = moment.format('MMM DD, YYY');
    this.title = `Edit menu for ${displayDate}`;
    this.dishes$ = this.store.meals$();
    this.actions = [
      {
        displayLabel: 'Cancel',
        color: ActionColors.WHITE,
        callback: () => this.onBack(),
        disabled: false
      },
      {
        displayLabel: 'Save',
        color: ActionColors.ACCENT,
        callback: () => this.onBack(),
        disabled: false
      },
    ]
  }

  public onBack(): void {
    this.routerService.dayDetails(this.route.parent.snapshot.params.dayId);
  }

  public onEditMealClick(mealId: number): void {
    this.routerService.mealEdit(this.route.parent.snapshot.params.dayId, mealId);
  }

  public onClearMealClick(mealId: number): void {
    this.store.clearDish(mealId);
  }
}
