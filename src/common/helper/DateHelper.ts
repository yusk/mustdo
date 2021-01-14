import * as fns from 'date-fns'
export class DateHelper {
  static toString = (date: Date, format: string = 'yyyy/MM/dd HH:mm:ss') => fns.format(date, format)
  static toStringDateOnly = (date: Date, format: string = 'yyyy/MM/dd') => fns.format(date, format)
  static toStringTimeOnly = (date: Date, format: string = 'HH:mm') => fns.format(date, format)
  static toDateFromString = (dateStr: string, date: Date, format: string = 'yyyy/MM/dd HH:mm:ss') =>
    fns.parse(dateStr, format, date)
  static toMillisecondFromSecond(secTime: number): number {
    return secTime * 1000
  }
}
