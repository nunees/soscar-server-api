
import {Request, Response} from "express";
import { container } from "tsyringe";
import { FetchLocationSchedulesUseCase } from "./fetchLocationSchedulesUseCase";

export class FetchLocationSchedulesController{
  async handle(request: Request, response: Response):Promise<Response>{
    const { location_id } = request.params;


    const fetchLocationSchedulesUseCase = container.resolve(FetchLocationSchedulesUseCase);

    const schedules = fetchLocationSchedulesUseCase.execute(location_id);

    return response.json(schedules);
    }
}