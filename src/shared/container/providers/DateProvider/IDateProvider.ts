export interface IDateProvider {
  compareInDays(start_date: Date, end_date: Date): number;
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  datenow(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
  compareIfBeforeOrEqual(start_date: Date, end_date: Date): boolean;
  compareIfAfter(start_date: Date, end_date: Date): boolean;
  compareIfTimeIsOpen(time: string, open_hours: string[]): boolean;

}
