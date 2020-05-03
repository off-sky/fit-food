import * as moment from 'moment';

export const getMomentId = (m: moment.Moment): string => {
    return m.format('YY.MM.DD')
}

export const getMomentFromId = (momentId: string): moment.Moment => {
    const [ year, month, date ] = momentId.split('.');
    const m = moment();
    m.year(parseInt(year, 10));
    m.month(parseInt(month, 10));
    m.date(parseInt(date, 10));
    return moment(m);
}