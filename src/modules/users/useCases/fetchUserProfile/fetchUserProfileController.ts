import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchUserProfileUseCase } from "./fetchUserProfileUseCase";

export class FetchUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    const {user_id} = request.params;

    const fetchUserProfileUseCase = container.resolve(FetchUserProfileUseCase);

    const profile = await fetchUserProfileUseCase.execute(user_id)

    return response.status(200).json(profile);
  }
}
