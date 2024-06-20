// export class Meal {
//   constructor(
//     public MealId: number,
//     public MealName: string,
//     public MealDescription: string,
//     public IsHealthy: boolean,
//     public IsAvailable: boolean,
//     public Price: number,
//     public Image: string,
//     public Tags: string[]=[],
//     public chefPageName: string,
//     public ChefPageId: number
//   ) {}
// }

export class Meal {
  constructor(
    public mealId: number = 0, // Default value
    public mealName: string = '', // Default value
    public mealDescription: string = '', // Default value
    public isHealthy: boolean = false, // Default value
    public isAvailable: boolean = true, // Assuming availability defaults to true
    public price: number = 0, // Default value
    public image: string = '', // Default value
    public tags: string[] = [], // Default value
    public chefPageName: string = '', // Default value
    public chefPageId: number = 0 // Default value
  ) {}
}
