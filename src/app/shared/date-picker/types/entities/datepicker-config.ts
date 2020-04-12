import { Day } from './day';
import { DatepickerLanguage, locales } from '../common';
import { Weekday } from './weekday';
import { Month } from './month';
import { Year } from './year';


export interface DatepickerConfig {
    dayCSSFn?: (day: Day) => string;
    dayLabelFn?: (day: Day, lang: DatepickerLanguage | string) => string;
    dayDisableFn?: (day: Day) => boolean;
    weekdayLabelFn?: (weekday: Weekday, lang: DatepickerLanguage | string) => string;
    weekdayCSSFn?: (weekday: Weekday) => string;
    monthLabelFn?: (month: Month, lang: DatepickerLanguage | string) => string;
    monthCSSFn?: (month: Month) => string;
    yearLabelFn?: (year: Year, lang: DatepickerLanguage | string) => string;
    yearCSSFn?: (year: Year) => string;
    isSingleSelect?: boolean;
    isDisablePast?: boolean;
    isDisableFuture?: boolean;
    isSundayFirst?: boolean;
    language?: DatepickerLanguage;
}


export const defaultDatepickerConfig: DatepickerConfig = {
    dayCSSFn,
    dayLabelFn,
    dayDisableFn,
    weekdayLabelFn,
    weekdayCSSFn,
    monthLabelFn,
    monthCSSFn,
    yearLabelFn,
    yearCSSFn,
    isSingleSelect: false,
    isDisablePast: false,
    isDisableFuture: false,
    isSundayFirst: true,
    language: DatepickerLanguage.ENG
}

function dayCSSFn(day: Day): string {
    let css = '';
    if (day.isDisabled) {
        css += 'disabled';
    }
    if (day.isSelected) {
        css += ' selected';
    }
    if (day.isOtherMonth) {
        css += ' other-month'
    }
    css.trim();
    return css;
}

function dayLabelFn(day: Day, lang: DatepickerLanguage | string): string {
    return day.moment.format('D');
}

function dayDisableFn(day: Day): boolean {
    return day.isDisabled;
}

function weekdayLabelFn(weekday: Weekday, lang: DatepickerLanguage | string): string {
    return capitalizeFirst(weekday.moment.format('ddd'));
}

function weekdayCSSFn(weekday: Weekday): string {
    let css = '';
    if (weekday.isSelected) {
        css += 'selected';
    }
    if (weekday.isDisabled) {
        css += ' disabled';
    }
    css.trim();
    return css;
}

function monthLabelFn(month: Month, lang: DatepickerLanguage | string): string {
    return capitalizeFirst(month.moment.format('MMMM'));
}

function monthCSSFn(month: Month): string {
    let css = '';
    if (month.isSelected) {
        css += 'selected';
    }
    if (month.isDisabled) {
        css += ' disabled';
    }
    css.trim();
    return css;
}

function yearLabelFn(year: Year, lang: DatepickerLanguage | string): string {
    return year.moment.format('YYYY');
}

function yearCSSFn(year: Year): string {
    let css = '';
    if (year.isSelected) {
        css += 'selected';
    }
    if (year.isDisabled) {
        css += ' disabled';
    }
    css.trim();
    return css;
}

function capitalizeFirst(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1)
}
