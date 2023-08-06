import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchAvatarUseCase } from "./FetchAvatarUseCase";

export class FetchAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers || request.params || request.body;

    const fetchAvatarUseCase = container.resolve(FetchAvatarUseCase);

    const avatar = await fetchAvatarUseCase.execute(id as string);

    const path = `./avatar/${avatar}`;

    console.log(path);

    return response.status(200).sendFile(
      avatar,
      {
        root: "./public/avatar",
      },
      () => {
        return response.status(404).json({ error: "Avatar not found" });
      }
    ) as any;
  }
}
