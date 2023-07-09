import { Request, Response } from "express";

export class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    const {} = request.body;
  }
}
