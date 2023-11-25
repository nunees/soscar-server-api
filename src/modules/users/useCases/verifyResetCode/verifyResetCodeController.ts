import {Request, Response} from "express";
import { container } from "tsyringe";
import { VerifyResetCodeUseCase } from "./verifyResetCodeUseCase";

export class VerifyResetCodeController{
  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.body;
    const { email } = request.params;

    const verifyResetCodeUseCase = container.resolve(VerifyResetCodeUseCase);

    const isValid = await verifyResetCodeUseCase.execute( email, code );

    if(!isValid){
      return response.status(401).json({code: "invalid"});
    }

    return response.status(200).send();
  }
}