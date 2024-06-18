import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { FavoriteItem } from '../models/favorite-item';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private baseUrl = 'https://localhost:7212/api'; // Update with your actual backend base URL

  constructor(private http: HttpClient) {}

  // Add favorite item
  addFavoriteItem(favoriteId: string, item: FavoriteItem): Observable<Favorite> {
    const url = `${this.baseUrl}/FavouriteItem?favouriteId=${encodeURIComponent(favoriteId)}`;
    return this.http.post<Favorite>(url, item).pipe(catchError(this.handleError));
  }

  // Delete favorite item
  deleteFavoriteItem(favoriteId: string, item: FavoriteItem): Observable<Favorite> {
    const url = `${this.baseUrl}/FavouriteItem/${encodeURIComponent(favoriteId)}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: item
    };
    return this.http.delete<Favorite>(url, options).pipe(catchError(this.handleError));
  }

  // Get user's favorite items
  getUserFavorites(userId: string): Observable<Favorite> {
    const url = `${this.baseUrl}/Favourite/${encodeURIComponent(userId)}`;
    return this.http.get<Favorite>(url).pipe(catchError(this.handleError));
  }

  // Handle HTTP errors
  private handleError(error: any) {
    console.error('API error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}