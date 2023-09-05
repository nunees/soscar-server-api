import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateBusinessPhotoUseCase } from "./UpdateBusinessPhotoUseCase";

export class UpdateBusinessPhotoController{
  async handle(request: Request, response: Response): Promise<Response>{
    try{
      console.log("OK")
      const { location_id } = request.params;
      const photo_file = request.file?.filename;

      console.log(photo_file);

      const updateBusinessPhotoUseCase = container.resolve(UpdateBusinessPhotoUseCase);

      await updateBusinessPhotoUseCase.execute(location_id,
        String(photo_file));

      return response.status(201).json({message: "Fotos atualizadas com sucesso!"});

    }catch(err){
      return response.status(400).json({ error: err.message });
    }
  }
}