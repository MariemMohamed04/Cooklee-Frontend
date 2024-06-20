import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Favorite } from '../models/favorite';
import { FavoriteItem } from '../models/favorite-item';


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private baseUrl = 'https://localhost:7212/api';

  constructor(private http: HttpClient) {}

  addFavoriteItem(favoriteId: string, item: FavoriteItem): Observable<Favorite> {
    const url = `${this.baseUrl}/FavouriteItem?favouriteId=${encodeURIComponent(favoriteId)}`;
    return this.http.post<Favorite>(url, { ...item }).pipe(
      catchError(this.handleError)
    );
  }

  getFavoriteItems(favoriteId: string): Observable<FavoriteItem[]> {
    console.log("2");

    const url = `${this.baseUrl}/FavouriteItem?favouriteId=${encodeURIComponent(favoriteId)}`;
    console.log("3");

    return this.http.get<FavoriteItem[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('API error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
