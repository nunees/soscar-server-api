import { ICreateSchedule } from "../dtos/ICreateSchedule";



export interface ISchedulesRepository{
  create(data: ICreateSchedule): Promise<void>;
  uploadDocument(schedule_id: string, file: string): Promise<void>;
}