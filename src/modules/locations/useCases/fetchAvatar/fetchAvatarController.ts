import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchAvatarUseCase } from "./fetchAvatarUseCase";

export class FetchAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {location_id, avatar_file} = request.params;

    const fetchAvatarUseCase = container.resolve(FetchAvatarUseCase);

    try {
      const avatar = await fetchAvatarUseCase.execute(
        location_id,avatar_file);

      return response.status(200).sendFile(avatar, {
        root: "./upload/locations",
      }) as any;
    } catch (error) {
      return response.status(404).send();
    }
  }
}
