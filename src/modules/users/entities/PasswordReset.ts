export interface PasswordReset{
  id?: string;
  user_id: string;
  code: string;
  expires_date: Date;
  created_at: Date;
  updated_at?: Date;
}