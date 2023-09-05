import {Request, Response} from "express";
import { container } from "tsyringe";
import { FetchAllLocationsPhotosUseCase } from "./fetchAllLocationsPhotosUseCase";
import { AppError } from "@shared/errors/AppError";

export class FetchAllLocationsPhotosController{
  async handle(request: Request, response: Response): Promise<Response>{
    try{
      const { location_id } = request.params;
      const { photo_file } = request.params;

      const fetchAllLocationsPhotosUseCase = container.resolve(FetchAllLocationsPhotosUseCase);

      const photo = await fetchAllLocationsPhotosUseCase.execute({location_id, photo_file});

      if(!photo) throw new AppError("Nenhuma foto encontrada", 404);

      console.log(photo);

      return response.status(200).sendFile(photo, {
        root: "./public/locations",
      }) as any;
    }
      catch(erro){
        throw new AppError("Arquivo indisponível no momento");
      }
    }
}