import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'https://localhost:7212/api';
  constructor(private http: HttpClient) { }

    // Add cart item
    addCartItem(cartId: string, item: CartItem): Observable<Cart> {
      const url = `${this.baseUrl}/CartItem?cartId=${encodeURIComponent(cartId)}`;
      return this.http.post<Cart>(url, item).pipe(catchError(this.handleError));
    }

    // Delete cart item
    deleteCartItem(cartId: string, item: CartItem): Observable<Cart> {
      const url = `${this.baseUrl}/CartItem/${encodeURIComponent(cartId)}`;
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        body: item
      };
      return this.http.delete<Cart>(url, options).pipe(catchError(this.handleError));
    }

    // Get user's cart items
    getUserCarts(userId: string): Observable<Cart> {
      const url = `${this.baseUrl}/Cart/${encodeURIComponent(userId)}`;
      return this.http.get<Cart>(url).pipe(catchError(this.handleError));
    }

    // Handle HTTP errors
    private handleError(error: any) {
      console.error('API error occurred:', error);
      return throwError('Something bad happened; please try again later.');
    }
}
