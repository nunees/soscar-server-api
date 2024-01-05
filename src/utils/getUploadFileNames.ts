/**
 * Returns the type of file (1) image, (2) document, (3) video, (4) audio.
 * @param ext - string with the extension of the file
 * @returns number - 1: image, 2: document, 3: video, 4: audio, 0: other
 */

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
