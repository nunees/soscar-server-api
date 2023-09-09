import { ICreateSchedule } from "@modules/schedule/dtos/ICreateSchedule";
import { Schedule } from "@modules/schedule/entities/Schedule";
import { ISchedulesRepository } from "@modules/schedule/repositories/ISchedulesRepository";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

@injectable()
export class SchedulesRepository implements ISchedulesRepository{
  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ){}


  async findById(id: string): Promise<Schedule | null> {
    const schedule = await this.prismaClient.userSchedules.findUnique({
      where: {
        id
      }
    });

    return schedule  as Schedule | null ;
  }

  async uploadDocument(schedule_id: string, file: string): Promise<void> {
    await this.prismaClient.schedulesFiles.create({
      data: {
        schedule_id,
        file_url: file
      }
    });
  }


  async create(data: ICreateSchedule): Promise<Schedule> {
    const schedule = await this.prismaClient.userSchedules.create({
      data:{
          user_id: data.user_id,
          vehicle_id: data.vehicle_id,
          location_id: data.location_id,
          service_type_id: data.service_type,
          date: data.date,
          time: data.time,
          notes: data.notes || null,
      }
    })

    return schedule;
  }

  async findByDate(date: Date): Promise<Schedule[] | null> {
    try{
      const schedules = await this.prismaClient.userSchedules.findMany({
        where: {
          date
        },
        orderBy: {
          time: "asc"
        }
      });

      return schedules as Schedule[] | null;
    }catch(error){
      throw new Error(error);
    }
  }

}