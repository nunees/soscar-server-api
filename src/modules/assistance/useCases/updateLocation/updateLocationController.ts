import {Request, Response} from 'express';
import { container } from 'tsyringe';
import { UpdateLocationUseCase } from './updateLocationUseCase';

export class UpdateLocationController{
  async handle(request: Request, response: Response): Promise<Response>{

    const {id} = request.params;

    const {latitude, longitude, busy, status} = request.body;

    const updateLocationUseCase = container.resolve(UpdateLocationUseCase);

    await updateLocationUseCase.execute(busy, latitude, longitude, id, status);

    return response.status(200).send();
  }
}