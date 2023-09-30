import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchScheduleByIdUseCase } from "./fetchScheduleByIdUseCase";

export class FetchScheduleByIdController{
 async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.headers;
    const {scheduleId} = request.params;

    console.log(scheduleId);


    const fetchScheduleByIdUsecase = container.resolve(FetchScheduleByIdUseCase);

    const schedule = await fetchScheduleByIdUsecase.execute(scheduleId);


    return response.status(200).json(schedule);
 }
}