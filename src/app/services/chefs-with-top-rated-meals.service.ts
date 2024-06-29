import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChefsWithTopRatedMealsService {
  private chefsWithMealsEndpoint = 'https://localhost:7212/api/ChefsWithTopRatedMeals/top-rated-meals';

  constructor(private http: HttpClient) {}

  getAllChefsWithTopRatedMeals(): Observable<ChefsWithTopRatedMealsDto[]> {
    return this.http.get<ChefsWithTopRatedMealsDto[]>(this.chefsWithMealsEndpoint)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}

export interface ChefsWithTopRatedMealsDto {
  idImgURL: string;
  name: string;
  topMeals: ChiefMealDto[];
}

export interface ChiefMealDto {
  mealName: string;
  price: number;
  rate: number;
}
