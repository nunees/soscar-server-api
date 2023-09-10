import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchSchedulesUseCase } from "./fetchSchedulesUseCase";

export class FetchSchedulesController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.user;

    const fetchSchedulesUsecase = container.resolve(FetchSchedulesUseCase);

    const schedules = await fetchSchedulesUsecase.execute(id);

    return response.status(200).json(schedules);
  }
}