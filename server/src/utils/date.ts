export function addDaysToDate(date  :Date,nbDays:number){
    date.setDate(date.getDate() + nbDays)
    return date
}