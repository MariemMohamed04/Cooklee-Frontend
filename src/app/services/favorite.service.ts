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

  addFavoriteItem(favoriteId: string, item: FavoriteItem): Observable<any> {
    const url = `${this.baseUrl}/FavouriteItem?favouriteId=${encodeURIComponent(favoriteId)}`;
    return this.http.post<any>(url, { ...item }).pipe(
      catchError(this.handleError)
    );
  }

  getFavoriteItems(favoriteId: string): Observable<Favorite> {
    const url = `${this.baseUrl}/Favourite/${encodeURIComponent(favoriteId)}`;
    return this.http.get<Favorite>(url).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: any) {
    console.error('API error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
