import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';
import { Observable } from 'rxjs';
import { MealsToReturn } from '../models/meals-to-return';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private baseurl="https://localhost:7212/meals/list"

  constructor(public http:HttpClient) { }

  getMealsOrderedByRate(): Observable<MealsToReturn[]> {
    return this.http.get<MealsToReturn[]>(`${this.baseurl}`);
  }

}
// getAllMeal() {
  //   return this.http.get<Meal[]>(this.baseurl);
  // }


  // getMealById(id:number){
  //   return this.http.get<Meal>(this.baseurl+id);
  // }

