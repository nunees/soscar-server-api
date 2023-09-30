
import {Request, Response} from "express";
import { container } from "tsyringe";
import { FetchLocationSchedulesUseCase } from "./fetchLocationSchedulesUseCase";

export class FetchLocationSchedulesController{
  async handle(request: Request, response: Response):Promise<Response>{
    const {id} = request.headers;
    const { location_id } = request.params;


    const fetchLocationSchedulesUseCase = container.resolve(FetchLocationSchedulesUseCase);

    const schedules = await fetchLocationSchedulesUseCase.execute(location_id);

    console.log(schedules)

    return response.json(schedules);
    }
}