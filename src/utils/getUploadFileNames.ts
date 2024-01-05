import { AppError } from "@errors/AppError";

export function GetUploadFileNames(documents: Express.Multer.File[]): (string | null)[] {
  const fileNames = documents.map((file) => {
    if(file.mimetype === "application/pdf" || file.mimetype === "image/png" || file.mimetype === "image/jpeg"){
      if(file.size > 5000000){
        throw new AppError("Tamanho do arquivo não pode ser maior que 5MB");
      }
      return String(file.filename).trim().split(" ").join("").toLowerCase();
    }

    if(file.mimetype === "video/mp4" || file.mimetype === "video/quicktime" || file.mimetype === "video/x-msvideo" || file.mimetype === "video/x-ms-wmv"){
      if(file.size > 50000000){
        throw new AppError("Tamanho do arquivo não pode ser maior que 50MB");
      }
      return String(file.filename).trim().split(" ").join("").toLowerCase();
    }
    return null;
  });

  return fileNames;
}

export function GetFiletypes(filetype: string): number{
  if(filetype === "image"){
    return 1;
  }else if(filetype === "application"){
    return 2;
  }else if(filetype === "video"){
    return 3;
  }else if(filetype === "audio"){
    return 4;
  }else{
    return 0;
  }
}

export function FileExtensionToNumber(ext: string): number{
  if(ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "gif"){
    return 1;
  }else if(ext === "pdf" || ext === "doc" || ext === "docx" || ext === "xls" || ext === "xlsx" || ext === "ppt" || ext === "pptx" || ext === "txt"){
    return 2;
  }else if(ext === "mp4" || ext === "avi" || ext === "mov" || ext === "wmv"){
    return 3;
  }else if(ext === "mp3" || ext === "wav" || ext === "wma"  || ext === "ogg"){
    return 4;
  }else{
    return 0;
  }
}
