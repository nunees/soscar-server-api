import { Request, Response } from "express";
import { container } from "tsyringe";
import { FetchDocumentUseCase } from "./FetchDocumentUseCase";

export class FetchDocumentController{

    async handle(request: Request, response: Response): Promise<Response>{
        const { document_id } = request.params;
        const { hashId } = request.params;

        const fetchDocumentUseCase = container.resolve(FetchDocumentUseCase);

        try{
            const document = await fetchDocumentUseCase.execute(document_id, hashId);

            return response.status(200).sendFile(document, {
                root: "./upload/quotes",
            }) as any;
        }catch(error){
            return response.status(404).send();
        }

    }
}