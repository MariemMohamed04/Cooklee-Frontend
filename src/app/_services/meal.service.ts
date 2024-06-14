import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private baseurl="https://localhost:7020/api/Meal/"

  getMealById(id:number){
    return this.http.get<Meal>(this.baseurl+id);
  }
  constructor(public http:HttpClient) { }
}
  // getAllMeal() {
  //   return this.http.get<Meal[]>(this.baseurl);
  // }



