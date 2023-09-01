import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateBusinessPhotoUseCase } from "./UpdateBusinessPhotoUseCase";

export class UpdateBusinessPhotoController{
  async handle(request: Request, response: Response): Promise<Response>{
    try{
      const { location_id } = request.params;
      const photos = request.files as Express.Multer.File[];

      console.log(photos);

      const photos_files_name = photos.map((file) => file.filename);

      const updateBusinessPhotoUseCase = container.resolve(UpdateBusinessPhotoUseCase);

      await updateBusinessPhotoUseCase.execute({
        location_id,
        photos_files: photos_files_name,
      });
      return response.status(201).send();
    }catch(err){
      return response.status(400).json({ error: err.message });
    }
  }
}