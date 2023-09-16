import { Request, Response } from "express";
import { container } from "tsyringe";

import { FetchCoverUseCase } from "./fetchCoverUseCase";

export class FetchCoverController {
  async handle(request: Request, response: Response): Promise<Response> {

    const {location_id, cover_file} = request.params;

    const fetchCoveruseCase = container.resolve(FetchCoverUseCase);

    try {
      const cover = await fetchCoveruseCase.execute(
        location_id,cover_file);

      return response.status(200).sendFile(cover, {
        root: "./upload/locations",
      }) as any;
    } catch (error) {
      return response.status(404).send();
    }
  }
}
