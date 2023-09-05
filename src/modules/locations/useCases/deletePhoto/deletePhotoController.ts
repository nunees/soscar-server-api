import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePhotoUseCase } from "./deletePhotoUseCase";

export class DeletePhotoController{
  async handle(request: Request, response: Response): Promise<Response>{
    const {photo_id} = request.params;

    const deletePhotoUseCase = container.resolve(DeletePhotoUseCase);

    await deletePhotoUseCase.execute(photo_id);

    return response.status(200).send({message: "Foto deletada com sucesso"});

  }
}