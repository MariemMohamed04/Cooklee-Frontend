import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../../models/meal';
import { throwError, Observable, catchError } from 'rxjs';
import { Feedback } from '../../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class AdminMealService {

  private baseUrl = 'https://localhost:7212/api/AdminMeal';
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('API error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  GetUnAcceptedMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.baseUrl}/UnAcceptedMeals`)
    .pipe(catchError(this.handleError));
  }

  AcceptMeal(chefId: number, mealId: number): Observable<boolean> {
    const url = `${this.baseUrl}/AcceptMeal?chefId=${chefId}&mealId=${mealId}`;
    return this.http.post<boolean>(url, null).pipe(catchError(this.handleError));
  }

  SendFeedback(chefId: number,  mealId: number, body: Feedback): Observable<any> {
    const url = `${this.baseUrl}/SendFeedback?chefId=${chefId}&mealId=${mealId}`;
    return this.http.post<any>(url, body)
      .pipe(catchError(this.handleError));
  }

}
