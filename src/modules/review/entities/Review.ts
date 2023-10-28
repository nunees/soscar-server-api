export interface Review{
  id: string;
  user_id: string;
  location_id: string;
  rating: number;
  review: string;
  created_at: Date;
  updated_at: Date;
}
