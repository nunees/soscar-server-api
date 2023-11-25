import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAssistanceStatusByIdUseCase } from './findAssistanceStatusByIdUseCase';

export class FindAssistanceStatusByIdController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.params;

    const status = container.resolve(FindAssistanceStatusByIdUseCase);

    const result = status.execute(id);

    return response.status(200).json(result);
  }
}

