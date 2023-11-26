export interface IUserTokenCreateDTO {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
  code?: string;
}
