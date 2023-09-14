import {Request, Response} from "express";
import { container } from "tsyringe";
import { UpdateScheduleUseCase } from "./updateScheduleUseCase";

export class UpdateScheduleController{
    async handle(request: Request, response: Response): Promise<Response>{
        const {schedule_id} = request.params;
        const {
            user_id,
            vehicle_id,
            location_id,
            service_type,
            date,
            time,
            notes,
            status,
            partner_notes,
        } = request.body;

        const fetchFilesUseCase = container.resolve(UpdateScheduleUseCase);

        try{
            await fetchFilesUseCase.execute(schedule_id, {
                user_id,
                vehicle_id,
                location_id,
                service_type,
                date,
                time,
                notes,
                status,
                partner_notes,
            });

            return response.status(201).send();

        }catch(error){
            throw new Error("Arquivo não encontrado");
        }
    }
}