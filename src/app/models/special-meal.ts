import { Client } from "./client";

export enum Status {
  Request = "Request",
  Wait = "Wait",
  Done = "Done"
}

export class SpecialMeal {
  s_MealName: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  mealStatus: Status | null;
  clientId: number;
  client: Client | null;
  chefPageId: number;
  chefPage: string;

  constructor(
    s_MealName: string = "",
    description: string = "",
    minPrice: number = 0,
    maxPrice: number = 0,
    mealStatus: Status | null = null,
    clientId: number = 0,
    client: Client | null = null,
    chefPageId: number = 0,
    chefPage: string = ""
  ) {
    this.s_MealName = s_MealName;
    this.description = description;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.mealStatus = mealStatus;
    this.clientId = clientId;
    this.client = client;
    this.chefPageId = chefPageId;
    this.chefPage = chefPage;
  }
}
