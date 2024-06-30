import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { SpecialMeal } from '../models/special-meal';

@Injectable({
  providedIn: 'root'
})
export class SpecialMealService {
  private baseUrl = "https://localhost:7212/api/SpecialMeal";

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('API error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  addSpecialMeal(specialMeal: SpecialMeal): Observable<SpecialMeal> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SpecialMeal>(`${this.baseUrl}`, specialMeal, { headers });
  }


    // updateMeal(meal: { id: number; MealName: any; Description: any; MinPrice: any; MaxPrice: any; }) {
    //   throw new Error('Method not implemented.');
    // }

  // getAllSpecialMeals(): Observable<SpecialMeal[]> {
  //   return this.http.get<SpecialMeal[]>(`${this.baseurl}/SpecialMeals`);
  // }

  // getSpecialMealById(id: number): Observable<SpecialMeal> {
  //   return this.http.get<SpecialMeal>(`${this.baseurl}/${id}`);
  // }

  // getSpecialMealByChefPageId(chefPageId: number): Observable<SpecialMeal[]> {
  //   return this.http.get<SpecialMeal[]>(`${this.baseurl}/byChefPage/${chefPageId}`);
  // }

  // getAllChefs(): Observable<Chef[]> {
  //   return this.http.get<Chef[]>(`${this.baseurl}/Chefs`);
  // }



//   updateSpecialMeal(id: number, specialMeal: SpecialMeal): Observable<any> {
//     console.log(id);
//     console.log(specialMeal);

//     return this.http.put(`${this.baseurl}/${id}`, specialMeal);
//   }

//   updatecMeal(meal: any): Observable<any> {
//     const url = `${this.baseurl}/${meal.id}`; // تأكد من أن لديك معرف (ID) في الوجبة
//     return this.http.put(url, meal);
// }

//   deleteSpecialMeal(id: number): Observable<any> {
//     return this.http.delete(`${this.baseurl}/${id}`);
//   }
}
