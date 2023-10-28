export interface IReturnDTO{
  id: string;
  user_id: string;
  location_id: string;
  rating: number;
  review: string;
  users: {
    id: string | null;
    name: string | null;
    username: string | null;
    avatar: string | null;
  }
  created_at: Date;
  updated_at: Date | null;
}