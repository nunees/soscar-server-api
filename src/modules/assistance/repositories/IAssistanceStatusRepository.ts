import { ICreateAssistanceStatusDTO } from "../dtos/ICreateAssistanceStatusDTO";
import { IReturnAssistanceStatusDTO } from "../dtos/IReturnAssistanceStatusDTO";
import { IUpdateAssistanceStatusDTO } from "../dtos/IUpdateAssistanceStatusDTO";
import { AssistanceStatus } from "../entities/AssistanceStatus";

export interface IAssistanceStatusRepository {
    create(data: ICreateAssistanceStatusDTO): Promise<void>;
    update(data: IUpdateAssistanceStatusDTO): Promise<void>;
    find(user_id: string): Promise<AssistanceStatus>;
    findById(id: string): Promise<AssistanceStatus | null>;
    findAvailablePartners(service_id: number): Promise<IReturnAssistanceStatusDTO[]>;
    findByUserId(user_id: string): Promise<AssistanceStatus | null>;
    updateLocation(busy: boolean, latitude: string, longitude: string, user_id: string, status: number): Promise<void>;
}