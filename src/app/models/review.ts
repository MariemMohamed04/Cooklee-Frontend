export interface Review {
  id: number;
  comment: string;
  rate: number;
  clientId: number;
  mealId: number;
  clientName: string;
  imgURL: string;
}