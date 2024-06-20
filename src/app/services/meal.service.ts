import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../models/meal';
import { MealsToReturn } from '../models/meals-to-return';
import { HomeMeal } from '../interfaces/home-meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private baseurl = 'https://localhost:7212/api/Meal/';
  private _baseurl = 'https://localhost:7212/meals/list';
  private homeMealsApiUrl = 'https://localhost:7212/api/HomePageMeals';
  constructor(public http: HttpClient) {}

  getMeals() {
    return this.http.get<HomeMeal[]>(this.homeMealsApiUrl);
  }

  getMealById(id: number): Observable<Meal> {
    return this.http.get<Meal>(this.baseurl + id);
  }
  getAllMeal() {
    return this.http.get<Meal[]>(this.baseurl);
  }
  getMealsOrderedByRate(): Observable<MealsToReturn[]> {
    return this.http.get<MealsToReturn[]>(`${this._baseurl}`);
  }
}
