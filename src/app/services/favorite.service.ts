import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FavoriteItem } from '../models/favorite-item';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private baseUrl = 'https://localhost:7212/api';

  constructor(private http: HttpClient) {}

  addFavoriteItem(
    favoriteId: string,
    item: FavoriteItem
  ): Observable<Favorite> {
    const url = `${this.baseUrl}/FavouriteItem?favouriteId=${encodeURIComponent(
      favoriteId
    )}`;
    return this.http
      .post<Favorite>(url, { ...item })
      .pipe(catchError(this.handleError));
  }

  deleteFavoriteItem(
    favoriteId: string,
    item: FavoriteItem
  ): Observable<Favorite> {
    const url = `${this.baseUrl}/FavouriteItem/${encodeURIComponent(
      favoriteId
    )}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { ...item }, // Using spread operator
    };
    return this.http
      .delete<Favorite>(url, options)
      .pipe(catchError(this.handleError));
  }

  getUserFavorites(userId: string): Observable<Favorite> {
    const url = `${this.baseUrl}/Favourite/${encodeURIComponent(userId)}`;
    return this.http.get<Favorite>(url).pipe(catchError(this.handleError));
  }

  removeFromCart(userId: string, item: FavoriteItem): Observable<any> {
    const url = `${this.baseUrl}/CartItem/${encodeURIComponent(userId)}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { ...item }, // Using spread operator
    };
    return this.http.delete(url, options).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
