import * as moment from 'moment';
export interface Day {
    id: string;
    moment: moment.Moment;
    isDisabled: boolean;
    isSelected: boolean;
    isOtherMonth: boolean;
}
