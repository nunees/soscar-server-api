import {Request, Response} from "express";
import { container } from "tsyringe";
import { FindLocationsByServiceUseCase } from "./findLocationsByServiceUseCase";


export class FindLocationsByServiceController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {serviceId} = request.params;

    console.log(serviceId)

    const findLocationsByServiceUseCase = container.resolve(FindLocationsByServiceUseCase);

    const locations = await findLocationsByServiceUseCase.execute(Number(serviceId));

    if(!locations) return response.status(404).send({message: "Nenhuma localização encontrada"});

    return response.status(200).send(locations);
  }
}