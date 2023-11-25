export interface IUserTokenReturnDTO {
  id?: string;
  expires_date: Date;
  refresh_token: string;
  code: string;
  user_id: string;
}
