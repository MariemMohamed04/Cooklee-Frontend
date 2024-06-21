import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'https://localhost:7212/api';
  private cart: Cart = new Cart();
  private cartSubject = new BehaviorSubject<Cart>(this.cart);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('API error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  getCart(cartId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/Cart/${cartId}`);
  }

  updateCart(cart: Cart): void {
    this.cart = cart;
    this.cartSubject.next(this.cart);
  }

  getCartItemsCount(): number {
    if (this.cart && this.cart.items) {
      return this.cart.items.length;
    }
    return 0;
  }

  addToCart(cartId: string, item: CartItem): Observable<Cart> {
    const url = `${this.baseUrl}/CartItem?cartId=${cartId}`;
    return this.http.post<Cart>(url, item).pipe(
      catchError(this.handleError),
      switchMap((updatedCart: Cart) => {
        this.cartSubject.next(updatedCart);
        return of(updatedCart);
      })
    );
  }

  updateCartItemQuantity(cartId: string, item: CartItem): Observable<Cart> {
    const url = `${this.baseUrl}/CartItem/${cartId}`;
    return this.http.patch<Cart>(url, item).pipe(
      catchError((error) => {
        console.error('Error updating item quantity in cart:', error);
        return throwError(error);
      })
    );
  }

  removeCartItem(cartId: string, item: CartItem): Observable<Cart> {
    return this.http.delete<Cart>(`${this.baseUrl}/CartItem/${cartId}`, { body: item })
      .pipe(catchError(this.handleError));
  }
}
