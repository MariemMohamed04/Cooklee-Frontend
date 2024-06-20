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
  ) {}
}

