export interface IUserTokenReturnDTO {
  id?: string;
  expires_date: Date;
  refresh_token: string;
  user_id: string;
}
