import { ICreateSchedule } from "../dtos/ICreateSchedule";
import { ILocationSchedule } from "../dtos/ILocationSchedule";
import { IReturnSchedule } from "../dtos/IReturnSchedule";
import { Schedule } from "../entities/Schedule";



export interface ISchedulesRepository{
  create(data: ICreateSchedule): Promise<Schedule>;
  uploadDocument(schedule_id: string, file: string): Promise<void>;
  findById(scheduleId: string): Promise<Schedule | null>;
  findByDate(date: Date): Promise<Schedule[] | null>;
  findAll(user_id: string, user_type: string): Promise<Schedule[] | null>;
  findFiles(schedule_id: string, file_url: string): Promise<string>;
  update(schedule: ICreateSchedule): Promise<void>;
  findLocationSchedules(location_id: string): Promise<Schedule[]>;
  findAllUsersSchedules(user_id: string, location_id: string): Promise<ILocationSchedule[]>;
}