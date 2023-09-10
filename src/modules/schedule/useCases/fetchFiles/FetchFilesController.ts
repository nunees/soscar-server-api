import {Request, Response} from "express";
import { container } from "tsyringe";
import { FetchFilesUseCase } from "./FetchFilesUseCase";

export class FetchFilesController{
    async handle(request: Request, response: Response){
        const {schedule_id} = request.params;
        const {file_url} = request.params;

        const fetchFilesUseCase = container.resolve(FetchFilesUseCase);

        try{
            const file = await fetchFilesUseCase.execute(schedule_id, file_url);

        return response.status(200).sendFile(file, {
            root: "./upload/schedules",
        }) as any;
        }catch(error){
            throw new Error("Arquivo não encontrado");
        }
    }
}