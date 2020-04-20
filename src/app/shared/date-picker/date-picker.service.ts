import { Injectable } from "@angular/core";
import * as datepicker from "./types";
import { Observable, BehaviorSubject, combineLatest } from "rxjs";
import * as cloneDeep from "clone-deep";
import * as moment from "moment";
import "moment/locale/uk";
import "moment/locale/en-ca";
import { DatepickerView } from "./types";
import {
  map,
  distinctUntilChanged,
  withLatestFrom,
  shareReplay,
  take,
} from "rxjs/operators";

type DatepickerStateKeyPath = [
  keyof datepicker.DatepickerState,
  (
    | keyof datepicker.DatepickerState["config"]
    | keyof datepicker.DatepickerState["currentViewMoment"]
    | keyof datepicker.DatepickerState["selectedMoments"]
  )?,
  ...string[]
];

@Injectable()
export class DatePickerService implements datepicker.DatepickerStore {
  
  private state$: BehaviorSubject<
    datepicker.DatepickerState
  > = new BehaviorSubject<datepicker.DatepickerState>(
    datepicker.initialDatepickerState
  );

  private daysSubj: Observable<datepicker.WithCSSAndLabel<datepicker.Day>[]>;

  constructor() {
    this.daysSubj = this.getDaysObservable();
    this.state$.asObservable().subscribe((state) => console.log(state));
  }

  back(): void {
    const view = this.state$.value.selectedView;
    const currentViewMoment = this.state$.value.currentViewMoment.entity;
    let newViewMoment: moment.Moment;
    switch (view) {
      case DatepickerView.DAY:
        newViewMoment = this.monthBack(currentViewMoment);
        break;
      case DatepickerView.MONTH:
        newViewMoment = this.yearBack(currentViewMoment);
        break;
      case DatepickerView.YEAR:
        newViewMoment = this.decadeBack(currentViewMoment);
        break;
    }
    this.emit(["currentViewMoment", "entity"], newViewMoment);
  }
  currentMonth$(): Observable<datepicker.WithCSSAndLabel<datepicker.Month>> {
    const { config } = this.state$.value;
    return this.currentViewMoment$().pipe(
      map((m) => {
        const result = {
          isDisabled: false,
          isSelected: false,
          moment: moment(m),
        } as datepicker.WithCSSAndLabel<datepicker.Month>;
        result.displayLabel = config.entity.monthLabelFn(
          result,
          config.entity.language
        );
        return result;
      })
    );
  }
  currentYear$(): Observable<datepicker.WithCSSAndLabel<datepicker.Year>> {
    return this.currentViewMoment$().pipe(
      withLatestFrom(this.state$.asObservable()),
      map(([m, state]) => {
        const { entity: config } = state.config;
        const result = {
          isDisabled: false,
          isSelected: false,
          moment: moment(m),
        } as datepicker.WithCSSAndLabel<datepicker.Year>;
        result.displayLabel = config.yearLabelFn(result, config.language);
        return result;
      })
    );
  }
  currentView$(): Observable<datepicker.DatepickerView> {
    return this.state$.asObservable().pipe(map((state) => state.selectedView));
  }
  days$(): Observable<datepicker.WithCSSAndLabel<datepicker.Day>[]> {
    return this.daysSubj;
  }
  decadeLabel$(): Observable<string> {
    return this.years$().pipe(
      map((years) => {
        return `${years[0].displayLabel}-${
          years[years.length - 1].displayLabel
        }`;
      })
    );
  }
  months$(): Observable<datepicker.WithCSSAndLabel<datepicker.Month>[]> {
    return this.currentViewMoment$().pipe(
      withLatestFrom(this.state$.asObservable()),
      map(([m, state]) => {
        const { entity: config } = state.config;
        const result = [] as datepicker.WithCSSAndLabel<datepicker.Month>[];
        const startOfYear = moment(m).startOf("y");
        for (let i = 0; i < 12; i++) {
          const curr = moment(moment(startOfYear).add(i, "M"));
          const month = {
            moment: curr,
            isSelected: curr.isSame(m, "y") && curr.isSame(m, "M"),
            isDisabled: false,
          } as datepicker.WithCSSAndLabel<datepicker.Month>;
          month.displayLabel = config.monthLabelFn(month, config.language);
          month.css = config.monthCSSFn(month);
          result.push(month);
        }
        return result;
      })
    );
  }
  weekdays$(): Observable<datepicker.WithCSSAndLabel<datepicker.Weekday>[]> {
    return this.days$().pipe(
      withLatestFrom(this.state$.asObservable()),
      map(([days, state]) => {
        const startOfWeek = moment().startOf("week");
        const { entity: config } = state.config;
        const result = [];
        for (let i = 0; i < 7; i++) {
          const curr = moment(moment(startOfWeek).add(i, "d"));
          const isDisabled = days.every(
            (day) => day.moment.weekday() !== curr.weekday() || day.isDisabled
          );
          const weekday = {
            moment: curr,
            isSelected: days.every(
              (day) => !isDisabled && (day.moment.weekday() !== curr.weekday() || day.isDisabled || day.isSelected)
            ),
            isDisabled: isDisabled,
          } as datepicker.Weekday;
          const withCssAndLabel = {
            ...weekday,
            css: config.weekdayCSSFn(weekday),
            displayLabel: config.weekdayLabelFn(weekday, config.language),
          };
          result.push(withCssAndLabel);
        }
        return result;
      })
    );
  }
  forward(): void {
    const view = this.state$.value.selectedView;
    const currentViewMoment = this.state$.value.currentViewMoment.entity;
    let newViewMoment: moment.Moment;
    switch (view) {
      case DatepickerView.DAY:
        newViewMoment = this.monthForward(currentViewMoment);
        break;
      case DatepickerView.MONTH:
        newViewMoment = this.yearForward(currentViewMoment);
        break;
      case DatepickerView.YEAR:
        newViewMoment = this.decadeForward(currentViewMoment);
        break;
    }
    this.emit(["currentViewMoment", "entity"], newViewMoment);
  }
  toggleDay(day: datepicker.Day): void {
    const state = this.state$.value;
    const selected = { ...state.selectedMoments.entities };
    const dayId = datepicker.momentId(day.moment);
    if (!!selected[dayId]) {
      delete selected[dayId];
      this.emit(["selectedMoments", "entities"], { ...selected });
    } else {
      if (state.config.entity.isSingleSelect) {
        this.emit(["selectedMoments", "entities"], { [dayId]: moment(day.moment) });
      } else {
        this.emit(["selectedMoments", "entities"], { ...selected, [dayId]: moment(day.moment) });
      }
    }
  }
  toggleWeek(weekday: datepicker.Weekday): void {
    if (weekday.isDisabled) {
      return;
    }
    const state = this.state$.value;
    if (state.config.entity.isSingleSelect) {
      return;
    }
    const selected = state.selectedMoments.entities;
    const isSelectedWeek = !weekday.isSelected;
    if (isSelectedWeek) {
      this.daysSubj.pipe( take(1) )
        .subscribe(days => {
          const newSelected = days
            .filter(d => {
              const m = d.moment;
              return (m.weekday() === weekday.moment.weekday());
            })
            .reduce((prev, curr) => {
              const m = curr.moment;
              return { ...prev, [datepicker.momentId(m)]: m }
            }, {});
          this.emit(['selectedMoments', 'entities'], { ...selected, ...newSelected });
        })
    } else {
      const newSelected = Object.keys(selected)
        .map(key => selected[key])
        .filter(m => !(m.weekday() === weekday.moment.weekday()))
        .reduce((prev, m) => {
          return {...prev, [datepicker.momentId(m)]: m}
        }, {});
      this.emit(['selectedMoments', 'entities'], { ...newSelected });
    }
  }
  setView(view: datepicker.DatepickerView): void {
    const { selectedView } = this.state$.value;
    if (view === selectedView) {
      this.emit(["selectedView"], datepicker.DatepickerView.DAY);
    } else {
      this.emit(["selectedView"], view);
    }
  }
  setMonth(month: datepicker.Month): void {
    const { entity: selectedMoment } = this.state$.value.currentViewMoment;
    const copy = moment(selectedMoment);
    copy.month(month.moment.month());
    this.emit(["currentViewMoment", "entity"], moment(copy));
  }
  setYear(year: datepicker.Year): void {
    const { entity: selectedMoment } = this.state$.value.currentViewMoment;
    const copy = moment(selectedMoment);
    copy.year(year.moment.year());
    this.emit(["currentViewMoment", "entity"], moment(copy));
  }
  setSelected(mm: moment.Moment[]): void {
    const newSelected = mm.reduce((prev, m) => {
      return { ...prev, [datepicker.momentId(m)]: m };
    }, {});
    this.emit(["selectedMoments", "entities"], newSelected);
  }
  setCurrentViewMoment(m: moment.Moment): void {
    this.emit(["currentViewMoment", "entity"], moment(m));
  }
  selectedChanged$(): Observable<moment.Moment[]> {
    return this.state$.asObservable().pipe(
      map((state) => state.selectedMoments),
      distinctUntilChanged((prev, curr) => prev.updatedAt === curr.updatedAt),
      map((state) => state.entities),
      map((entities) => Object.keys(entities).map((key) => entities[key]))
    );
  }
  setConfig(config: datepicker.DatepickerConfig): void {
    const filteredUndefined = Object.keys(config).reduce((prev, curr) => {
      if (config[curr] === undefined) {
        return { ...prev };
      }
      return { ...prev, [curr]: config[curr] };
    }, {});
    const resultConfig = Object.assign(
      {},
      datepicker.defaultDatepickerConfig,
      filteredUndefined
    );
    moment.locale(resultConfig.language);
    if (resultConfig.isSundayFirst) {
      moment.updateLocale(resultConfig.language, {
        week: {
          dow: 0, // First day of week is Sunday
          doy: 6, // First week of year must contain 1 January (7 + 0 - 1)
        },
      });
    } else {
      moment.updateLocale(resultConfig.language, {
        week: {
          dow: 1, // First day of week is Monday
          doy: 4, // First week of year must contain 4 January (7 + 1 - 4)
        },
      });
    }
    this.emit(["config", "entity"], resultConfig);
    const prevViewMoment = this.state$.value.currentViewMoment.entity;
    const newViewMoment = moment();
    newViewMoment.year(prevViewMoment.year());
    newViewMoment.month(prevViewMoment.month());
    newViewMoment.date(prevViewMoment.date());
    this.emit(
      ["currentViewMoment", "entity"],
      moment(newViewMoment)
    );
  }
  years$(): Observable<datepicker.WithCSSAndLabel<datepicker.Year>[]> {
    return this.currentViewMoment$().pipe(
      withLatestFrom(this.state$.asObservable()),
      map(([m, state]) => {
        const { entity: config } = state.config;
        const result = [] as datepicker.WithCSSAndLabel<datepicker.Month>[];
        const startOfYear = moment(m).startOf("y");
        for (let i = 0; i < datepicker.decadeLength; i++) {
          const curr = moment(moment(startOfYear).add(i, "y"));
          const year = {
            moment: curr,
            isSelected: curr.isSame(m, "y"),
            isDisabled: false,
          } as datepicker.WithCSSAndLabel<datepicker.Month>;
          const withCSSAndLabel = {
            ...year,
            css: config.yearCSSFn(year),
            displayLabel: config.yearLabelFn(year, config.language),
          };
          result.push(withCSSAndLabel);
        }
        return result;
      })
    );
  }
  private getDefaultMomentDisabled(
    m: moment.Moment,
    disablePast: boolean,
    disableFuture: boolean
  ): boolean {
    const today = moment();
    if (disablePast) {
      if (m.isBefore(today)) {
        return true;
      }
    }
    if (disableFuture) {
      if (m.isAfter(today)) {
        return true;
      }
    }
    return false;
  }
  private getDaysObservable(): Observable<
    datepicker.WithCSSAndLabel<datepicker.Day>[]
  > {
    return this.currentViewMoment$().pipe(
      withLatestFrom(this.state$.asObservable()),
      map(([m, state]) => {
        const { entity: config } = state.config;
        const result = [] as datepicker.WithCSSAndLabel<datepicker.Day>[];
        const startOfMonth = moment(m).startOf("month");
        const startOfWeek = moment(startOfMonth).startOf("week");
        
        for (let i = 0; i < 42; i++) {
          const curr = moment(moment(startOfWeek).add(i, "d"));
          const id = datepicker.momentId(curr);
          const day = {
            moment: curr,
            isOtherMonth: curr.month() !== m.month(),
            isSelected: !!state.selectedMoments.entities[id],
            isDisabled: this.getDefaultMomentDisabled(
              curr,
              config.isDisablePast,
              config.isDisableFuture
            ),
          } as datepicker.WithCSSAndLabel<datepicker.Day>;
          day.isDisabled = config.dayDisableFn(day);
          day.displayLabel = config.dayLabelFn(day, config.language);
          day.css = config.dayCSSFn(day);
          result.push(day);
        }
        return result;
      }),
      shareReplay(1)
    );
  }
  private currentViewMoment$(): Observable<moment.Moment> {
    const currViewMoment$ = this.state$.asObservable().pipe(
      map((state) => state.currentViewMoment),
      distinctUntilChanged((prev, curr) => prev.updatedAt === curr.updatedAt),
      map((state) => state.entity)
    );

    const currSelection$ = this.state$.asObservable().pipe(
      map((state) => state.selectedMoments),
      distinctUntilChanged((prev, curr) => prev.updatedAt === curr.updatedAt),
      map((state) => state.entities)
    );

    return combineLatest(currViewMoment$, currSelection$).pipe(
      map(([viewMoment, selection]) => moment(viewMoment))
    );
  }

  private monthBack(m: moment.Moment): moment.Moment {
    const result = m.subtract(1, "M");
    return moment(result);
  }

  private monthForward(m: moment.Moment): moment.Moment {
    const result = m.add(1, "M");
    return moment(result);
  }

  private yearBack(m: moment.Moment): moment.Moment {
    const result = m.subtract(1, "y");
    return moment(result);
  }

  private yearForward(m: moment.Moment): moment.Moment {
    const result = m.add(1, "y");
    return moment(result);
  }

  private decadeBack(m: moment.Moment): moment.Moment {
    const result = m.subtract(datepicker.decadeLength, "y");
    return moment(result);
  }

  private decadeForward(m: moment.Moment): moment.Moment {
    const result = m.add(datepicker.decadeLength, "y");
    return moment(result);
  }

  private emit(path: DatepickerStateKeyPath, value: any): void {
    const previousState = this.state$.value;
    const updatedState = this.setToValue(
      previousState,
      value,
      path as string[]
    );
    this.state$.next(updatedState);
  }

  private setToValue(source: any, value: any, path: string[]): any {
    let current = cloneDeep(source) as datepicker.DatepickerState;
    const target = current;
    let i;
    for (i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
      if ("updatedAt" in current === true) {
        current["updatedAt"] = new Date().getTime();
      }
    }
    current[path[i]] = value;
    return target;
  }
}
