import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadDocumentsUseCase } from "./uploadDocumentsUseCase";


export class UploadDocumentsController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.user;
    const {schedule_id} = request.params;
    const file = request.file?.filename;

    const uploadDocumentsUseCase = container.resolve(UploadDocumentsUseCase);

    await uploadDocumentsUseCase.execute(id, schedule_id, file as string);

    return response.status(201).send();
  }
}