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
    public mealStatus: Status ,
    public userId: string,
    public client: Client | null,
    public chefPageId: number,
    public chefPage: string,
    public id:number,
    public isAccepted: boolean,
    public isTaken: boolean
  ) {

  }
}


