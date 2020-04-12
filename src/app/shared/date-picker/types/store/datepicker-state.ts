import * as moment from 'moment';
import { DatepickerView } from '../common';
import { DatepickerConfig, defaultDatepickerConfig } from '../entities/datepicker-config';

export interface DatepickerState {
    config: {
        entity: DatepickerConfig;
        updatedAt: number;
    };
    currentViewMoment: {
        entity: moment.Moment;
        updatedAt: number;
    };
    selectedView: DatepickerView;
    selectedMoments: {
        entities: {
            [dateId: string]: moment.Moment;
        };
        updatedAt: number;
    };
}

export const initialDatepickerState: DatepickerState = {
    config: {
        entity: defaultDatepickerConfig,
        updatedAt: null
    },
    currentViewMoment: {
        entity: moment(),
        updatedAt: null
    },
    selectedView: DatepickerView.DAY,
    selectedMoments: {
        entities: {},
        updatedAt: null
    }
}


