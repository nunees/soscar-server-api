import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateLocationCoverImageUseCase } from "./UpdateLocationCoverImageUseCase";


export class UpdateLocationCoverImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const {location_id} = request.params;

      const cover_file = request.file?.filename as string;


      const updateLocationCoverImageUseCase = container.resolve(UpdateLocationCoverImageUseCase);

      await updateLocationCoverImageUseCase.execute({
        location_id,
        cover_file,
      });

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}