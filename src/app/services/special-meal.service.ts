import { HttpClient, HttpParams } from '@angular/common/http';
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
  getAllByClient(userId:string): Observable<SpecialMeal[]> {
    let params = new HttpParams()
    .set('userId', userId)
    return this.http.get<SpecialMeal[]>(this.baseurl+"/SpecialMealsByClient",{params});
  }

  getSpecialMealById(id: number): Observable<SpecialMeal> {
    let params = new HttpParams()
    .set('specialMealId', id)
    return this.http.get<SpecialMeal>(`${this.baseurl}`, {params} );
  }

  getSpecialMealByChefPageId(chefPageId: number): Observable<SpecialMeal[]> {
    return this.http.get<SpecialMeal[]>(`${this.baseurl}/byChefPage/${chefPageId}`);
  }

  getAllChefs(): Observable<Chef[]> {
    return this.http.get<Chef[]>(`${this.baseurl}/Chefs`);
  }


addSpecialMeal(specialMeal: SpecialMeal): Observable<any> {
  console.log("Data being sent to the server:", specialMeal);
  return this.http.post<SpecialMeal>(this.baseurl, specialMeal);
}

  updateSpecialMeal( specialMeal: SpecialMeal): Observable<any> {
    console.log(specialMeal);

    return this.http.put(`${this.baseurl}`, specialMeal);
  }

  updatecMeal(meal: any): Observable<any> {
    const url = `${this.baseurl}/${meal.id}`;
    return this.http.put(url, meal);
}

  deleteSpecialMeal(id: number): Observable<any> {
    return this.http.delete(`${this.baseurl}/${id}`);
  }
}
