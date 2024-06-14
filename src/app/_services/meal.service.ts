import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';
import { Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private baseurl="https://localhost:7020/api/Meal/"

  getMealById(id:number){
    return this.http.get<Meal>(this.baseurl+id);
  }
  getAllMeal() {
    return this.http.get<Meal[]>(this.baseurl);
  }
  postReview(review: Review): Observable<any> {
    return this.http.post<any>(this.baseurl, review);
  }
  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseurl + 'reviews');
  }

  // getReview(id: number): Observable<Review> {
  //   return this.http.get<Review>(this.baseurl + id);
  // }

  deleteReview(id: number): Observable<any> {
    return this.http.delete<any>(this.baseurl + id + '/reviews');
  }
  constructor(public http:HttpClient) { }
}




