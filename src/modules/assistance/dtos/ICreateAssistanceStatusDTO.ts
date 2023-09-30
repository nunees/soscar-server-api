export interface ICreateAssistanceStatusDTO {
    user_id: string;
    status: number;
    service_id: number;
    latitude: string;
    longitude: string;
    milesFee?: number;
    price: number;
}