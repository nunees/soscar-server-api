import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAvatarUseCase } from "./UpdateAvatarUseCase";

export class UpdateAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user;
      const avatar_file = request.file?.filename as string;

      const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);

      const avatar = await updateAvatarUseCase.execute({
        user_id: id,
        avatar_file,
      });

      return response.status(200).json(avatar);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
