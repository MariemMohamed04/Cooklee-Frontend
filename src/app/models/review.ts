export interface Review {
  id?: number;      // Optional ID property, as it might not be needed when creating a new review
  comment: string;
  rate: number;
  clientId: number;
  mealId: number;
}
