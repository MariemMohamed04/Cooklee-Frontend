import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecialMeal } from '../models/special-meal';
import { Chef } from '../models/chef';

@Injectable({
  providedIn: 'root'
})
export class SpecialmealService {
  private baseurl = "https://localhost:7212/api/SpecialMeal";

  constructor(private http:HttpClient) {}

  getAllSpecialMeals(): Observable<SpecialMeal[]> {
    return this.http.get<SpecialMeal[]>(`${this.baseurl}/SpecialMeals`);
  }

  getSpecialMealById(id: number): Observable<SpecialMeal> {
    return this.http.get<SpecialMeal>(`${this.baseurl}/${id}`);
  }

  getSpecialMealByChefPageId(chefPageId: number): Observable<SpecialMeal[]> {
    return this.http.get<SpecialMeal[]>(`${this.baseurl}/byChefPage/${chefPageId}`);
  }

  getAllChefs(): Observable<Chef[]> {
    return this.http.get<Chef[]>(`${this.baseurl}/Chefs`);
  }

  addSpecialMeal(specialMeal: SpecialMeal): Observable<SpecialMeal> {
    console.log("1");
    return this.http.post<SpecialMeal>(this.baseurl, specialMeal);
    console.log("2");
  }

  updateSpecialMeal(id: number, specialMeal: SpecialMeal): Observable<void> {
    return this.http.put<void>(`${this.baseurl}/${id}`, specialMeal);
  }

  deleteSpecialMeal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/${id}`);
  }
}
