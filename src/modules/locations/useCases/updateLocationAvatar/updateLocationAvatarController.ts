import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateLocationAvatarUseCase } from "./updateLocationAvatarUseCase";


export class UpdateLocationAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {

      const { id } = request.user;
      const { location_id } = request.params;
      const avatar_file = request.file?.filename as string;

      const updateLocationAvatarUseCase = container.resolve(UpdateLocationAvatarUseCase);

      await updateLocationAvatarUseCase.execute({
        location_id,
        avatar_file,
      });

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}