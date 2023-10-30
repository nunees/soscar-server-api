import {Request, Response } from "express";
import { container } from "tsyringe";
import { FindLegalQuoteByHashIdUseCase } from "./findLegalQuoteByHashIdUseCase";

export class FindLegalQuoteByHashIdController{
  async handle(request: Request, response: Response): Promise<Response>{

    const {id} = request.user;
    const { hashId } = request.params;


    const findLegalQuoteByHashIdUseCase = container.resolve(FindLegalQuoteByHashIdUseCase);

    const quote = await findLegalQuoteByHashIdUseCase.execute(id, hashId);

    return response.status(200).send(quote);
  }
}