const datetime = require('date-and-time') 

export function formatDateToDateTime(time){
    const date = new Date(time)
    return datetime.format(date, 'MMM D YYYY, h:mm A')

}

export function formatDateToDate(time){
    const date = new Date(time)
    return datetime.format(date, 'MMM D YYYY')

}