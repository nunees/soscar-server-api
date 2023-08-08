import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchAvatarUseCase } from "./FetchAvatarUseCase";
import { AppError } from "@shared/errors/AppError";
import { message } from "@shared/lang/pt-br/String";

export class FetchAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers || request.params || request.body;

    const fetchAvatarUseCase = container.resolve(FetchAvatarUseCase);

    try {
      const avatar = await fetchAvatarUseCase.execute(String(id));

      const path = `./avatar/${avatar}`;

      console.log(path);

      return response.status(200).sendFile(avatar, {
        root: "./public/avatar",
      }) as any;
    } catch (error) {
      throw new AppError(message.InternalError, 500);
    }
  }
}
