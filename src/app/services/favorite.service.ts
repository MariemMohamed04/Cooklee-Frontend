import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { FavoriteItem } from '../models/favorite-item';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private baseUrl = 'https://localhost:7212/api/Favourite';
  private baseUrl2 = 'https://localhost:7212/api/FavouriteItem';

  constructor(private http: HttpClient) { }

  // AddFavoriteItem(favoriteId: string, favoriteItem: FavoriteItem): Observable<FavoriteItem> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   const params = new HttpParams().set('favoriteId', favoriteId);
  //   const options = { headers, params };

  //   console.log("AddFavoriteItem called with:");
  //   console.log("favoriteId:", favoriteId);
  //   console.log("favoriteItem:", favoriteItem);

  //   return this.http.post<FavoriteItem>(`${this.baseUrl2}`, favoriteItem, options);
  // }

  AddFavoriteItem(favoriteId: string, favoriteItem: FavoriteItem): Observable<FavoriteItem> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const params = new HttpParams().set('favoriteId', favoriteId);
    const options = { headers, params };

    console.log("AddFavoriteItem called with:");
    console.log("favoriteId:", favoriteId);
    console.log("favoriteItem:", favoriteItem);

    return this.http.post<FavoriteItem>(this.baseUrl2, favoriteItem, options)
      .pipe(
        catchError(this.handleError)
      );
      console.log("returned data");
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error occurred, like network issues or CORS violation
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  GetFavoriteById(id: string): Observable<Favorite> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Favorite>(url);
  }

  DeleteFavorite(favoriteItem: FavoriteItem, favoriteId: string): Observable<void> {
    console.log("Delete02");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("Delete03");
    const params = new HttpParams().set('favoriteId', favoriteId);
    console.log("Delete04");
    const options = {
      headers,
      params,
      body: favoriteItem
    };
    console.log("Delete05");
    return this.http.delete<void>(this.baseUrl2, options);
  }
}