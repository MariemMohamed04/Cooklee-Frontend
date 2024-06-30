// import { Client } from "./client";

// export enum Status {
//   Request = "Request",
//   Wait = "Wait",
//   Done = "Done"
// }

// export class SpecialMeal {
//   constructor(
//     public id: number,
//     public s_MealName: string,
//     public description: string,
//     public minPrice: number,
//     public maxPrice: number,
//     public mealStatus: string | null,
//     public clientId: number,
//     public client: string | null,
//     public chefPage: string | null,
//     public isAccepeted: boolean,
//     public isTaken: boolean
//   ) {}
// }

export interface SpecialMeal {
  s_MealName: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  mealStatus?: 'Request' | 'Wait' | 'Done';
  clientId: number;
  chefId?: number;
  isAccepted: boolean;
  isTaken: boolean;
}

