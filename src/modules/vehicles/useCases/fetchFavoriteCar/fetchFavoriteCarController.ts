
import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchFavoriteCarUseCase } from "./fetchFavoriteCarUseCase";


export class FetchFavoriteCarController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.headers;

    const fetchFavoriteCarUseCase = container.resolve(FetchFavoriteCarUseCase);

    const vehicles = await fetchFavoriteCarUseCase.execute(String(id));

    return response.status(200).json(fetchFavoriteCarUseCase);
  }
}