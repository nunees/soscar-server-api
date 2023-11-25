import {Request, Response} from "express";

import { container } from "tsyringe";

import { FindAllAssistanceStatusUseCase } from "./findAllAssistanceStatusUseCase";

export class FindAllAssistanceStatusController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id: user_id} = request.user;

    const findAllAssistanceStatusUseCase = container.resolve(FindAllAssistanceStatusUseCase);

    const status = await findAllAssistanceStatusUseCase.execute(user_id);

    return response.status(200).json(status);
  }
}