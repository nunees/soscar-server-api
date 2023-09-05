import {Request, Response} from "express";

export class CreateScheduleController{
  async handle(request: Request, response: Response): Promise<Response>{


    return response.status(201).send();
  }
}