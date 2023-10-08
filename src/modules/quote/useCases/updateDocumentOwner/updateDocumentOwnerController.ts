import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateDocumentOwnerUseCase } from "./updateDocumentOwnerUseCase";


export class UpdateDocumentOwnerController{
  async handle(request: Request, response: Response): Promise<Response>{

    const {user_id} = request.params;
    const {document_id} = request.params;

    const updateDocumentOwnerUseCase = container.resolve(UpdateDocumentOwnerUseCase);

    await updateDocumentOwnerUseCase.execute(document_id, user_id);

    return response.status(200).send();

  }
}