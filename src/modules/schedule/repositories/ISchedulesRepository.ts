import { ICreateSchedule } from "../dtos/ICreateSchedule";
import { Schedule } from "../entities/Schedule";



export interface ISchedulesRepository{
  create(data: ICreateSchedule): Promise<Schedule>;
  uploadDocument(schedule_id: string, file: string): Promise<void>;
  findById(id: string): Promise<Schedule | null>;
  findByDate(date: Date): Promise<Schedule[] | null>;
}