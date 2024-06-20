import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';
import { Observable } from 'rxjs';
import { MealsToReturn } from '../models/meals-to-return';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private baseurl="https://localhost:7020/api/Meal/"
  private homeMealsApiUrl = 'https://localhost:7212/api/HomePageMeals';

  meals: Meal[] = [];
  private baseUrl="https://localhost:7212/meals/list"

  constructor(public http:HttpClient) { }

  getAllMeal() {
    return this.http.get<HomeMeal[]>(this.homeMealsApiUrl);
  }

}


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

  getMealsOrderedByRate(): Observable<MealsToReturn[]> {
    return this.http.get<MealsToReturn[]>(`${this.baseUrl}`);
  }

}
// getAllMeal() {
  //   return this.http.get<Meal[]>(this.baseUrl);
  // }


  // getMealById(id:number){
  //   return this.http.get<Meal>(this.baseUrl+id);
  // }