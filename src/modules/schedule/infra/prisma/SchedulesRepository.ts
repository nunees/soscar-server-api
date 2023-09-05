import { ICreateSchedule } from "@modules/schedule/dtos/ICreateSchedule";
import { ISchedulesRepository } from "@modules/schedule/repositories/ISchedulesRepository";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

@injectable()
export class SchedulesRepository implements ISchedulesRepository{
  constructor(
    @inject("PrismaClient")
    private prismaClient: PrismaClient
  ){}



  async uploadDocument(schedule_id: string, file: string): Promise<void> {
    await this.prismaClient.schedulesFiles.create({
      data: {
        schedule_id,
        file_url: file
      }
    });
  }


  async create(data: ICreateSchedule): Promise<void> {
    await this.prismaClient.userSchedules.create({
      data:{
         ...data
      }
    })
  }

}