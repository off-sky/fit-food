import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ScreenSizeService } from '../../screen-size/screen-size.service';
import { Observable, Subject } from 'rxjs';
import { ScreenSizes, ScreenSizeType } from '../../screen-size/interfaces';
import { AbstractPopupable } from '../types/abstract-popupable';
import { PopupableService } from '../popupable.service';
import { take, startWith, map, withLatestFrom, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'r-popupable',
  templateUrl: './popupable.component.html',
  styleUrls: ['./popupable.component.scss']
})
export class PopupableComponent implements OnInit {

  public static open<C, D, R>(component: C, data: D): Observable<R> {
    PopupableComponent.openedSubj.next({ component, data });

    return PopupableComponent.closedSubj.asObservable()
      .pipe(
        take(1)
      )
  }

  private static openedSubj: Subject<{ component: any, data: any}> = new Subject();
  private static closedSubj: Subject<any> = new Subject<any>();

  public screenSize$: Observable<ScreenSizeType>;
  public screenSizes = ScreenSizes;
  @ViewChildren('popupable') private popupable: QueryList<AbstractPopupable>;

  constructor(
    private screenSizeService: ScreenSizeService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.screenSize$ = this.screenSizeService.screenSize$();
    })
    const popup$: Observable<AbstractPopupable> = this.popupable.changes
    .pipe(
      map(ql => ql.first),
      startWith(this.popupable.first),
      filter(popup => !!popup),
    );

  PopupableComponent.openedSubj.asObservable()
      .pipe(
        withLatestFrom(popup$),
        switchMap(([popupState, popup]) => {
          return popup.open(popupState.component, popupState.data)
        })
      )
      .subscribe(result => PopupableComponent.closedSubj.next(result));
  }

}
