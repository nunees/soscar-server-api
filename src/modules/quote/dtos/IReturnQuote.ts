export interface IReturnQuote {
    id: string;
    hashId: string;
    is_juridical: boolean;
    user_id: string;
    vehicle_id: string;
    insurance_company_id?: number | null;
    service_type_id: number | null ;
    franchise_price: number | null;
    service_price: number | null;
    user_notes: string | null;
    partner_notes: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    UserQuotesDocuments:{
        document_type_id: number;
        document_url: string | null;
    }
    users: {
        name: string;
        email: string;
        mobile: string;
    }
    insurance_company: {
        name: string;
        id: number;
    }
    location: {
    user_id?: string | undefined;
    cnpj: string;
    business_name: string;
    business_phone: string;
    business_email: string;
    address_line: string;
    number: number;
    city: string;
    district: string;
    state: string;
    zipcode: string;
    location_id?: string;
    payment_methods: number[];
    business_categories: number[];
    business_description: string | null;
    open_hours: string;
    open_hours_weekend: string[];
    latitude: string | null;
    longitude: string | null;
}

}