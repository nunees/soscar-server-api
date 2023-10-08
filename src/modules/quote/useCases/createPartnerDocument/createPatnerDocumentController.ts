import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePartnerDocumentUseCase } from "./createPartnerDocumentUseCase";

export class CreatePartnerDocumentController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.user;
    const {quote_id} = request.params;
    const {hashId} = request.params;

    console.log(id, quote_id, hashId)

    const document = request.file?.filename as string;

    const createPartnerDocumentUseCase = container.resolve(CreatePartnerDocumentUseCase);

    const quote = await createPartnerDocumentUseCase.execute({
      user_id: String(id),
      quote_id,
      document,
      hashId
    });

    return response.status(201).json(quote);
  }
}