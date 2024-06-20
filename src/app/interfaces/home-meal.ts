export interface HomeMeal {
  mealName: string;
  mealDescription: string;
  isHealthy: boolean;
  isAvailable: boolean;
  isSpecial: boolean;
  price: number;
  rate: number;
  image: string;
  tags: string[];
  chefPageId: number;
}
