import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { FavoriteItem } from '../models/favorite-item';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private baseUrl = 'https://localhost:7212/api';

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error('API error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  getFavorite(favouriteId: string): Observable<Favorite> {
    return this.http.get<Favorite>(`${this.baseUrl}/Favourite/${favouriteId}`)
    .pipe(catchError(this.handleError));
  }

  addFavoriteItem(favouriteId: string, item: FavoriteItem): Observable<Favorite> {
    const url = `${this.baseUrl}/FavouriteItem?favouriteId=${favouriteId}`;
    return this.http.post<Favorite>(url, item ).pipe(
      catchError(this.handleError)
    );
  }

  removeFavoriteItem(favouriteId: string, item: FavoriteItem): Observable<Favorite> {
    return this.http.delete<Favorite>(`${this.baseUrl}/FavouriteItem/${favouriteId}`, { body: item })
    .pipe(catchError(this.handleError));
  }

}
