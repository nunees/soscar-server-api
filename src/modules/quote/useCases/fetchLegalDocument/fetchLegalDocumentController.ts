import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchLegalDocumentUseCase } from "./fetchLegalDocumentUseCase";

export class FetchLegalDocumentController{

    async handle(request: Request, response: Response): Promise<Response>{
        const { document_id } = request.params;
        const { hashId } = request.params;

        const fetchLegalDocumentUseCase = container.resolve(FetchLegalDocumentUseCase);



        try{
            const document = await fetchLegalDocumentUseCase.execute(document_id, hashId);

            return response.status(200).sendFile(document, {
                root: "./upload/quotes",
            }) as any;
        }catch(error){
            return response.status(404).send();
        }

    }
}