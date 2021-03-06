import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DatePickerService } from '../date-picker.service';
import { Observable } from 'rxjs';
import * as dp from '../types';
import * as moment from 'moment';

@Component({
  selector: 'r-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [ DatePickerService ]
})
export class DatePickerComponent implements OnInit {

  /**
   * Should select date on click
   */
  @Input() public allowSelect: boolean = true;

  /**
   * [momentId: string]: [ filled, filled, ..., filled ]
   */
  @Input() public dateFilledMap: {} = {};


  /**
   * A day was clicked in the calendar
   */
  @Output() public dayClicked: EventEmitter<dp.Day> = new EventEmitter<dp.Day>();

  /**
   * Emits on every change of selected days
   */
  @Output() public selectedChanged: EventEmitter<moment.Moment[]> = new EventEmitter<moment.Moment[]>();


  public currentMonth$: Observable<dp.WithCSSAndLabel<dp.Month>>;
  public currentView$: Observable<dp.DatepickerView>;
  public currentYear$: Observable<dp.WithCSSAndLabel<dp.Year>>;
  public days$: Observable<dp.WithCSSAndLabel<dp.Day>[]>;
  public decadeLabel$: Observable<string>;
  public DatepickerView = dp.DatepickerView;
  public months$: Observable<dp.WithCSSAndLabel<dp.Month>[]>;
  public weekdays$: Observable<dp.WithCSSAndLabel<dp.Weekday>[]>;
  public years$: Observable<dp.WithCSSAndLabel<dp.Year>[]>;


  constructor(
    private store: DatePickerService
  ) { }

  ngOnInit(): void {
    this.currentMonth$ = this.store.currentMonth$(); 
    this.currentView$ = this.store.currentView$();
    this.currentYear$ = this.store.currentYear$();
    this.days$ = this.store.days$();
    this.decadeLabel$ = this.store.decadeLabel$();
    this.months$ = this.store.months$();
    this.weekdays$ = this.store.weekdays$();
    this.years$ = this.store.years$();

    this.store.setConfig({ isSundayFirst: false, isSingleSelect: false, isDisablePast: true, language: dp.DatepickerLanguage.ENG });
    this.store.selectedChanged$()
      .subscribe(vals => this.selectedChanged.emit(vals));
  }

  public setMonth(month: dp.Month): void {
    this.store.setMonth(month);
    this.store.setView(dp.DatepickerView.DAY);
  }

  public setView(view: dp.DatepickerView): void {
    this.store.setView(view);
  }

  public setYear(year: dp.Year): void {
    this.store.setYear(year);
    this.store.setView(dp.DatepickerView.DAY);
  }

  public toggleDay(day: dp.Day): void {
    this.dayClicked.emit(day);
    if (this.allowSelect) {
      this.store.toggleDay(day);
    }
  }

  public toggleWeek(weekday: dp.Weekday): void {
    if (this.allowSelect) {
      this.store.toggleWeek(weekday);
    }
  }

  public forward(): void {
    this.store.forward();
  }

  public back(): void {
    this.store.back();
  }



}
