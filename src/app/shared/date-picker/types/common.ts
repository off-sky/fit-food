import * as moment from 'moment';
import * as fromTypes from '../../../../types';

/**
 * e.g. 2009/11/01
 */
export type DateId = string;

export enum DatepickerView {
  DAY = "day",
  MONTH = "month",
  YEAR = "year",
}

export enum DatepickerLanguage {
  ENG = "en-ca",
  UA = "uk",
}

export const decadeLength = 6;

export const locales = {
  weekdays: {
    [DatepickerLanguage.ENG]: {
      0: "Mon",
      1: "Tue",
      2: "Wed",
      3: "Thu",
      4: "Fri",
      5: "Sat",
      6: "Sun",
    },
    [DatepickerLanguage.UA]: {
      0: "Пн",
      1: "Вт",
      2: "Ср",
      3: "Чт",
      4: "Пт",
      5: "Сб",
      6: "Нд",
    },
  },
  months: {
    [DatepickerLanguage.ENG]: {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    },
    [DatepickerLanguage.UA]: {
      0: "Січень",
      1: "Лютий",
      2: "Березень",
      3: "Квітень",
      4: "Травень",
      5: "Червень",
      6: "Липень",
      7: "Серпень",
      8: "Вересень",
      9: "Жовтень",
      10: "Листопад",
      11: "Грудень",
    },
  },
};

export const momentId = (m: moment.Moment): string => {
    return fromTypes.utils.getMomentId(m);
}
