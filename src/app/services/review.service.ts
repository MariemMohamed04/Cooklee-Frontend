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
console.log('before url');
    return this.http.post<any>(this.baseurl, review);
  }
  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}${reviewId}`);
  }

  getReview(id: number): Observable<Review> {
    return this.http.get<Review>(this.baseurl + id);
  }


}
