import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Action, ActionColors } from 'src/app/shared/actions';
import { RouterService } from 'src/app/core/services/router.service';
import { ToastService } from 'src/app/core/toast/toast.service';

@Component({
  selector: 'r-add-to-calendar',
  templateUrl: './add-to-calendar.component.html',
  styleUrls: ['./add-to-calendar.component.scss']
})
export class AddToCalendarComponent implements OnInit {

  public isAnySelected$: Observable<boolean>;
  public actions$: Observable<Action[]>;
  private selectedSubj$: BehaviorSubject<moment.Moment[]> = new BehaviorSubject<moment.Moment[]>([]);

  public dayFilledMap = {
    '20.05.13': [true, true, false, true]
  };

  constructor(
    private routerService: RouterService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.isAnySelected$ = this.selectedSubj$.asObservable()
      .pipe(
        map(vals => vals.length > 0)
      );
    
    this.actions$ = this.isAnySelected$
        .pipe(
          map(isAnySelected => {
            if (isAnySelected) {
              return  [
                {
                  displayLabel: 'Cancel',
                  color: ActionColors.WHITE,
                  callback: () => this.onBack(),
                  disabled: false
                },
                {
                  displayLabel: 'Save',
                  color: ActionColors.ACCENT,
                  callback: () => this.onSave(),
                  disabled: false
                },
              ]
            } else {
              return [
                {
                  displayLabel: 'Cancel',
                  color: ActionColors.WHITE,
                  callback: () => this.onBack(),
                  disabled: false
                },
                {
                  displayLabel: 'Save',
                  color: ActionColors.ACCENT,
                  disabled: true
                }
              ]
            }
          })
        )
  }

  public onBack(): void {
    this.routerService.back();
  }

  private onSave(): void {
    this.toastService.openToast('Added to your menu');
    this.routerService.back();
  }

  public onSelectedChanged(event: moment.Moment[]): void {
    this.selectedSubj$.next(event);
  }

}
