
export interface ICreatePasswordRecoverDTO {
  user_id: string;
  code: string;
  expires_date: Date;
}