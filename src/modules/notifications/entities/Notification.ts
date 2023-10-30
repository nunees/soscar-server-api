export interface Notification{
  id: string;
  user_id: string;
  title: string;
  body: string;
  received: boolean;
  created_at: Date;
  updated_at: Date;
}