import { ICreateAssistanceStatusDTO } from "../dtos/ICreateAssistanceStatusDTO";

export interface IAssistanceStatus {
    create(data: ICreateAssistanceStatusDTO): Promise<void>;
}