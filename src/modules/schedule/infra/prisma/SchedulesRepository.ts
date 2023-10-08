import { ICreateSchedule } from "@modules/schedule/dtos/ICreateSchedule";
import { ILocationSchedule } from "@modules/schedule/dtos/ILocationSchedule";
import { IReturnSchedule } from "@modules/schedule/dtos/IReturnSchedule";
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

  async findAllUsersSchedules(user_id: string, location_id: string): Promise<ILocationSchedule[]> {
    const schedules = await this.prismaClient.userSchedules.findMany({
      where: {
        location_id,
      },
      include: {
        _count: true
      }
    });

    return schedules;
  }

  async findLocationSchedules(location_id: string): Promise<Schedule[]> {
    const schedules = await this.prismaClient.userSchedules.findMany({
      where: {
        location_id
      }
    });

    return schedules as unknown as Schedule[];
  }


  async findById(scheduleId: string): Promise<Schedule | null> {
    const schedule = await this.prismaClient.userSchedules.findUnique({
      where: {
        id: scheduleId
      },
      include: {
        users: {
          select: {
            UsersAddresses: {
              select: {
                address_line: true,
                number: true,
                city: true,
                district: true,
                state: true,
                zipcode: true,
              }
            },
            id: true,
            name: true,
            last_name: true,
            cpf: true,
            genderId: true,
            mobile_phone: true,
          }
        },
        location: true,
        service_type: true,
        vehicles:{
          include: {
            brand: true,
            name: true,
            InsuranceCompanies: true,
        },
      },
      SchedulesFiles: {
        select: {
          file_url: true,
        }
      },
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
    });

    return schedule as unknown as Schedule;
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

  async findAll(user_id: string, user_type: string): Promise<Schedule[] | null> {
   if(user_type === "partner"){
    const schedules = await this.prismaClient.userSchedules.findMany({
      where: {
        location: {
          users: {
            id: user_id,
            AND: {
              isPartner: true
            }
          }
        },
      },
      orderBy: {
        date: "desc"
      },
      include: {
        users: true,
        location: true,
        service_type: true,
      }
    });

    return schedules as unknown as Schedule[] | null;
  }


   if(user_type === "client"){
    const schedules = await this.prismaClient.userSchedules.findMany({
      where: {
        users: {
          id: user_id,
          AND: {
            isPartner: false
          }
        }
      },
      orderBy: {
        date: "desc"
      },
      include: {
        users: true,
        location: true,
        service_type: true,
      }
    });
    return schedules as unknown as Schedule[] | null;
  }

  return [];
  }

  async findFiles(schedule_id: string, file_url: string): Promise<string> {
    const file = await this.prismaClient.schedulesFiles.findFirst({
      where: {
        schedule_id,
        AND: {
          file_url,
        }
      }
    });

    return file?.file_url || "" as string;

  }

  async update(schedule: ICreateSchedule): Promise<void> {
    const scheduleExists = await this.prismaClient.userSchedules.findUnique({
      where: {
        id: schedule.id
      }
    });

    await this.prismaClient.userSchedules.update({
      where: {
        id: scheduleExists?.id || schedule.id,
      },
      data: {
        user_id: schedule.user_id || scheduleExists?.user_id,
        vehicle_id: schedule.vehicle_id || scheduleExists?.vehicle_id,
        location_id: schedule.location_id || scheduleExists?.location_id,
        service_type_id: schedule.service_type || scheduleExists?.service_type_id,
        date: schedule.date || scheduleExists?.date,
        time: schedule.time || scheduleExists?.time,
        notes: schedule.notes || scheduleExists?.notes,
        partner_notes: schedule.partner_notes,
        status: Number(schedule.status) || scheduleExists?.status,
      }
    });
  }

}