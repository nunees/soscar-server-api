import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadDocumentsUseCase } from "./uploadDocumentsUseCase";

export class UploadDocumentsController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;
    const file = request.file?.filename;

    const uploadDocumentsUseCase = container.resolve(UploadDocumentsUseCase);

    await uploadDocumentsUseCase.execute({id, file});

    return response.status(201).send();
  }
}