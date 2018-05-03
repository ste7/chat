import moment from 'moment'

export const formateTime = (date) => {
    var week = moment(date).isSame(moment(), 'week');
    var today = moment(date).isSame(moment(), 'day');

    if (week) {
        return moment(date).format('LT');
    } else if (today) {
        return moment(date).format('dddd');
    } else {
        return moment(date).format('L');
    }
}
