import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'https://localhost:7212/api';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('API error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  addCartItem(cartId: string, item: CartItem): Observable<Cart> {
    return this.http.post<Cart>(`${this.baseUrl}/CartItem?cartId=${cartId}`, item)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCart(cartId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/${cartId}`)
      .pipe(catchError(this.handleError));
  }

  updateCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.baseUrl, cart)
      .pipe(catchError(this.handleError));
  }

  deleteCart(cartId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${cartId}`)
      .pipe(catchError(this.handleError));
  }


  updateCartItemQuantity(cartId: string, item: CartItem): Observable<Cart> {
    return this.http.patch<Cart>(`${this.baseUrl}/item/${cartId}`, item)
      .pipe(catchError(this.handleError));
  }

  deleteCartItem(cartId: string, item: CartItem): Observable<Cart> {
    return this.http.request<Cart>('delete', `${this.baseUrl}/item/${cartId}`, { body: item })
      .pipe(catchError(this.handleError));
  }
}

// addCartItem(cartId: string, item: CartItem): Observable<Cart> {
//   const url = `${this.baseUrl}/CartItem?cartId=${encodeURIComponent(cartId)}`;
//   return this.http.post<Cart>(url, { ...item }).pipe(
//     catchError(this.handleError)
//   );
// }

  // addCartItem(cartId: string, item: CartItem): Observable<Cart> {
  //   const url = `${this.baseUrl}/CartItem?cartId=${encodeURIComponent(cartId)}`;
  //   return this.http.post<Cart>(url, { ...item }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // deleteCartItem(cartId: string, item: CartItem): Observable<Cart> {
  //   const url = `${this.baseUrl}/CartItem/${encodeURIComponent(cartId)}`;
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     body: { ...item } // Using spread operator
  //   };
  //   return this.http.delete<Cart>(url, options).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // getUserCarts(userId: string): Observable<Cart> {
  //   const url = `${this.baseUrl}/Cart/${encodeURIComponent(userId)}`;
  //   return this.http.get<Cart>(url).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // removeFromFavorites(userId: string, item: CartItem): Observable<any> {
  //   const url = `${this.baseUrl}/FavoriteItem/${encodeURIComponent(userId)}`;
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     body: { ...item } // Using spread operator
  //   };
  //   return this.http.delete(url, options).pipe(
  //     catchError(this.handleError)
  //   );
  // }