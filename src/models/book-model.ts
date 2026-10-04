export interface BookModel {
  id: string;
  author_id: string;
  title: string;
  genre: string;
  release_date: Date;
  total_quantity: number;
  available_quantity: number;
  created_at: Date;
  updated_at: Date;
}
