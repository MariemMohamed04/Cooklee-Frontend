import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecialMeal } from '../models/special-meal';
import { Chef } from '../models/chef';

@Injectable({
  providedIn: 'root'
})
export class SpecialMealService {
  updateMeal(meal: { id: number; MealName: any; Description: any; MinPrice: any; MaxPrice: any; }) {
    throw new Error('Method not implemented.');
  }
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
  console.log("Data being sent to the server:", specialMeal);
  return this.http.post<SpecialMeal>(this.baseurl, specialMeal);
}

  updateSpecialMeal(id: number, specialMeal: SpecialMeal): Observable<any> {
    console.log(id);
    console.log(specialMeal);

    return this.http.put(`${this.baseurl}/${id}`, specialMeal);
  }

  updatecMeal(meal: any): Observable<any> {
    const url = `${this.baseurl}/${meal.id}`; // تأكد من أن لديك معرف (ID) في الوجبة
    return this.http.put(url, meal);
}

  deleteSpecialMeal(id: number): Observable<any> {
    return this.http.delete(`${this.baseurl}/${id}`);
  }
}
