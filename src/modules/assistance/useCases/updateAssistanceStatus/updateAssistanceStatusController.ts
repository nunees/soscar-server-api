import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateAssistanceStatusUseCase } from './updateAssistanceStatusUseCase';


export class UpdateAssistanceStatusController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const {serviceId, milesFee, price, latitude, longitude, busy} = request.body;

    const updateAssistanceStatusUseCase = container.resolve(UpdateAssistanceStatusUseCase);

    await updateAssistanceStatusUseCase.execute({
      id,
      service_id: Number(serviceId),
      milesFee: Number(milesFee),
      price: Number(price),
      busy,
      latitude,
      longitude
    });

    return response.status(200).send();
  }
}
