import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { MealsToReturn } from '../models/meals-to-return';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private baseurl = 'https://localhost:7212/api/Meal/';
  private _baseurl = 'https://localhost:7212/meals/list';
  constructor(public http: HttpClient) {}

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
