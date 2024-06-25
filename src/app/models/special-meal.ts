import { Client } from "./client";

export enum Status {
  Request = "Request",
  Wait = "Wait",
  Done = "Done"
}

export class SpecialMeal {
  constructor(
    public s_MealName: string,
    public description: string,
    public minPrice: number,
    public maxPrice: number,
    public mealStatus: Status | null,
    public clientId: number,
    public client: Client | null,
    public chefPageId: number,
    public chefPage: string,
    public id:number

  ) {

  }
}
