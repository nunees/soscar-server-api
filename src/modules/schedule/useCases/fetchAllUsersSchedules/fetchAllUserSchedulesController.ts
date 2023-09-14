import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchAllUserSchedulesUseCase } from "./fetchAllUserSchedulesUseCase";

export class FetchAllUserSchedulesController{
    async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.user;
        const {location_id} = request.params

        const fetchAllUserSchedulesUseCase = container.resolve(FetchAllUserSchedulesUseCase);

        const schedules = await fetchAllUserSchedulesUseCase.execute(id, location_id);

        return response.json(schedules);
    }
}