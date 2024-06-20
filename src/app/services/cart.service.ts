import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartItem } from '../models/cart-item';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'https://localhost:7212/api';

  constructor(private http: HttpClient) {}

  addCartItem(cartId: string, item: CartItem): Observable<Cart> {
    const url = `${this.baseUrl}/CartItem?cartId=${encodeURIComponent(cartId)}`;
    return this.http
      .post<Cart>(url, { ...item })
      .pipe(catchError(this.handleError));
  }

  deleteCartItem(cartId: string, item: CartItem): Observable<Cart> {
    const url = `${this.baseUrl}/CartItem/${encodeURIComponent(cartId)}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { ...item }, // Using spread operator
    };
    return this.http
      .delete<Cart>(url, options)
      .pipe(catchError(this.handleError));
  }

  getUserCarts(userId: string): Observable<Cart> {
    const url = `${this.baseUrl}/Cart/${encodeURIComponent(userId)}`;
    return this.http.get<Cart>(url).pipe(catchError(this.handleError));
  }

  removeFromFavorites(userId: string, item: CartItem): Observable<any> {
    const url = `${this.baseUrl}/FavoriteItem/${encodeURIComponent(userId)}`;
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
