import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private baseurl="https://localhost:7020/api/Meal/"
  private homeMealsApiUrl = 'https://localhost:7212/api/HomePageMeals';

  meals: Meal[] = [];

  getMealById(id:number){
    return this.http.get<Meal>(this.baseurl+id);
  }
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

