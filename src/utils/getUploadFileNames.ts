import { AppError } from "@shared/errors/AppError";

const fileTypes = [
  {id: 1, name: "pdf", created_at: new Date()},
  {id: 2, name: "doc", created_at: new Date()},
  {id: 3, name: "docx", created_at: new Date()},
  {id: 4, name: "xls", created_at: new Date()},
  {id: 5, name: "xlsx", created_at: new Date()},
  {id: 6, name: "ppt", created_at: new Date()},
  {id: 7, name: "pptx", created_at: new Date()},
  {id: 8, name: "txt", created_at: new Date()},
  {id: 9, name: "jpg", created_at: new Date()},
  {id: 10, name: "jpeg", created_at: new Date()},
  {id: 11, name: "png", created_at: new Date()},
  {id: 12, name: "gif", created_at: new Date()},
  {id: 13, name: "mp4", created_at: new Date()},
  {id: 14, name: "avi", created_at: new Date()},
  {id: 15, name: "mov", created_at: new Date()},
]

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

