import {Request, Response} from "express";
import { container } from "tsyringe";
import { CreateScheduleUseCase } from "./createScheduleUseCase";

export class CreateScheduleController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id}  = request.user;
    const {vehicle_id, location_id, service_type, date, time, notes} = request.body;

    const createScheduleUseCase = container.resolve(CreateScheduleUseCase);

    const schedule = await createScheduleUseCase.execute({
      user_id: id,
      vehicle_id: vehicle_id,
      location_id,
      service_type,
      date,
      time,
      notes
    });

    if(!schedule){
      return response.status(400).json({error: "Erro ao criar agendamento"});
    }
    return response.status(201).send();
  }
}