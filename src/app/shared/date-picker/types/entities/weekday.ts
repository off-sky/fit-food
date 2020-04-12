import * as moment from 'moment';
export interface Weekday {
    moment: moment.Moment;
    isSelected: boolean;
    isDisabled: boolean;
}