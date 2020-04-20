import { Component, OnInit } from '@angular/core';
import { DatePickerService } from '../date-picker.service';
import { Observable } from 'rxjs';
import * as dp from '../types';

@Component({
  selector: 'r-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [ DatePickerService ]
})
export class DatePickerComponent implements OnInit {

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

    this.store.setConfig({ isSundayFirst: false, isSingleSelect: false, isDisablePast: true, language: dp.DatepickerLanguage.UA })
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
    this.store.toggleDay(day);
  }

  public toggleWeek(weekday: dp.Weekday): void {
    this.store.toggleWeek(weekday)
  }

  public forward(): void {
    this.store.forward();
  }

  public back(): void {
    this.store.back();
  }



}
