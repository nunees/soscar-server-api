import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchUserProfileUseCase } from "./fetchUserProfileUseCase";

export class FetchUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;

    const fetchUserProfileUseCase = container.resolve(FetchUserProfileUseCase);

    const profile = await fetchUserProfileUseCase.execute(String(id))

    return response.status(200).json(profile);
  }
}
