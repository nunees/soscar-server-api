import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindModelNameByIdUseCase } from "./findModelNameByIdUseCase";

export class FindModelNameByIdController{
  async handle(request: Request, response: Response): Promise<Response>{
    const { brand_id} = request.params;

    const findModelNameByIdUseCase = container.resolve(FindModelNameByIdUseCase);

    const model = await findModelNameByIdUseCase.execute(Number(brand_id));

    return response.status(200).send(model);
  }
}