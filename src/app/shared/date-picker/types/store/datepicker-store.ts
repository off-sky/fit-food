import * as moment from 'moment';
import { DatepickerView } from '../common';
import { Day } from '../entities/day';
import { DatepickerConfig } from '../entities/datepicker-config';
import { Observable } from 'rxjs';
import { Weekday } from '../entities/weekday';
import { WithCSSAndLabel } from '../entities/with-css-and-label';
import { Month } from '../entities/month';
import { Year } from '../entities/year';

export interface DatepickerStore {
    back(): void;
    currentMonth$(): Observable<WithCSSAndLabel<Month>>;
    currentYear$(): Observable<WithCSSAndLabel<Year>>;
    currentView$(): Observable<DatepickerView>;
    decadeLabel$(): Observable<string>;
    days$(): Observable<WithCSSAndLabel<Day>[]>;
    months$(): Observable<WithCSSAndLabel<Month>[]>
    weekdays$(): Observable<WithCSSAndLabel<Weekday>[]>;
    forward(): void;
    toggleDay(day: Day): void;
    toggleWeek(weekday: Weekday): void;
    setView(view: DatepickerView): void;
    setCurrentViewMoment(m: moment.Moment): void;
    setSelected(mm: moment.Moment[]): void;
    selectedChanged$(): Observable<moment.Moment[]>;
    setConfig(config: DatepickerConfig): void;
    setMonth(month: Month): void;
    setYear(year: Year): void;
    years$(): Observable<WithCSSAndLabel<Year>[]>;
}