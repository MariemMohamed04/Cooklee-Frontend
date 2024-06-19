import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseurl="https://localhost:7212/api/Review/"

  constructor(public http:HttpClient) { }

  getReviewsByMealId(mealId: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseurl+ mealId);
  }
  addReview(review: Review): Observable<any> {
    return this.http.post<any>(this.baseurl, review);
  }
  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseurl + 'reviews');
  }

  getReview(id: number): Observable<Review> {
    return this.http.get<Review>(this.baseurl + id);
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete<any>(this.baseurl + id + '/reviews');
  }
}
