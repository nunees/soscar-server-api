import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllBrandsUseCase } from "./ListAllBrandsUseCase";

export class ListAllBrandsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllBrandsUseCase = container.resolve(ListAllBrandsUseCase);
    const brands = await listAllBrandsUseCase.execute();
    return response.status(200).json(brands);
  }
}
