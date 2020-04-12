import * as moment from 'moment';
export interface Month {
    moment: moment.Moment;
    isDisabled: boolean;
    isSelected: boolean;
}