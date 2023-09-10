import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayJsDateProvider implements IDateProvider {



  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);
    return dayjs(end_date_utc).diff(start_date_utc, "days");
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);
    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  datenow(): Date {
    return dayjs().toDate();
  }



  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }

  compareIfBeforeOrEqual(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date) || dayjs(start_date).isSame(end_date);
  }

  compareIfAfter(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isAfter(end_date);
  }

  compareIfTimeIsOpen(time: string, open_hours: string[]): boolean {
    const [hour, minute] = time.split(":").map(Number);
    const timeInMinutes = hour * 60 + minute;

    const [open_hour, open_minute] = open_hours[0].split(":").map(Number);
    const openTimeInMinutes = open_hour * 60 + open_minute;

    const [close_hour, close_minute] = open_hours[1].split(":").map(Number);
    const closeTimeInMinutes = close_hour * 60 + close_minute;

    return timeInMinutes >= openTimeInMinutes && timeInMinutes <= closeTimeInMinutes;
  }

}
