import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateLegalDocumentOwnerUseCase } from "./uploadLegalDocumentOwnerUseCase";

export class UpdateLegalDocumentOwnerController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {document} = request.params;

    const updateLegalDocumentOwnerUseCase = container.resolve(UpdateLegalDocumentOwnerUseCase);

    await updateLegalDocumentOwnerUseCase.execute(document);

    return response.status(200).send();
  }

}