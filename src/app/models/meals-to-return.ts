// favorite-item.ts
export interface FavoriteItem extends MealsToReturn {
  pictureUrl: string;
}

// cart-item.ts
export interface CartItem extends MealsToReturn {
  pictureUrl: string;
  quantity: number;
}

export class MealsToReturn {
  constructor(
    public id: number,
    public mealName: string,
    public mealDescription: string,
    public isHealthy: boolean,
    public price: number,
    public rate: number,
    public image: string,
    public tags: string[],
    public chefPageName: string,
    public chefPageId: number,
    public pictureUrl: string = '', // Add default value for compatibility
    public quantity: number = 0 // Add default value for compatibility
  ) {}
}

