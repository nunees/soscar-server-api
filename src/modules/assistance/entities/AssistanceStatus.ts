export interface AssistanceStatus{
    id?: string;
    user_id: string;
    status?: number;
    service_id: number;
    latitude?: string;
    longitude?: string;
    milesFee?: number;
    price?: number;
    busy?: boolean;
    created_at?: Date;
    updated_at?: Date;
}