import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchAvatarUseCase } from "./FetchAvatarUseCase";
import { AppError } from "@shared/errors/AppError";

export class FetchAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;
    const { avatar_file} = request.params;

    const fetchAvatarUseCase = container.resolve(FetchAvatarUseCase);

    try {
      const avatar = await fetchAvatarUseCase.execute(id, avatar_file);

      if(!avatar) throw new AppError("Avatar não encontrado", 404);

      return response.status(200).sendFile(avatar, {
        root: "./upload/avatar",
      }) as any;
    } catch (error) {
      throw new AppError("Avatar não encontrado 2", 404);
    }
  }
}
