import * as moment from 'moment';
export interface Day {
    moment: moment.Moment;
    isDisabled: boolean;
    isSelected: boolean;
    isOtherMonth: boolean;
}
