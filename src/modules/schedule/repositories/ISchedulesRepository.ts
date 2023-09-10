import { ICreateSchedule } from "../dtos/ICreateSchedule";
import { IReturnSchedule } from "../dtos/IReturnSchedule";
import { Schedule } from "../entities/Schedule";



export interface ISchedulesRepository{
  create(data: ICreateSchedule): Promise<Schedule>;
  uploadDocument(schedule_id: string, file: string): Promise<void>;
  findById(id: string): Promise<Schedule | null>;
  findByDate(date: Date): Promise<Schedule[] | null>;
  findAll(user_id: string): Promise<Schedule[] | null>;
  findFiles(schedule_id: string, file_url: string): Promise<string>;
  update(schedule: ICreateSchedule): Promise<void>;
  findLocationSchedules(location_id: string): Promise<Schedule[]>;
}