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
  private cart: Cart = new Cart(); // Local storage of cart

  // Subject to notify subscribers when cart changes
  private cartSubject = new BehaviorSubject<Cart>(this.cart);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('API error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  getCart(cartId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/Cart/${cartId}`);
  }

    // Update local cart and notify subscribers
    updateCart(cart: Cart): void {
      this.cart = cart;
      this.cartSubject.next(this.cart);
    }

    // Calculate and return the count of cart items
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
          // Assuming the backend returns the updated cart with items
          // Update the local cart in the service
          this.cartSubject.next(updatedCart); // Update the cart in BehaviorSubject

          return of(updatedCart); // Return observable with updated cart
        })
      );
    }

  updateCartItemQuantity(cartId: string, item: CartItem): Observable<Cart> {
    return this.http.patch<Cart>(`${this.baseUrl}/item/${cartId}`, item);
  }

  deleteCartItem(cartId: string, item: CartItem): Observable<Cart> {
    return this.http.delete<Cart>(`${this.baseUrl}/item/${cartId}`, { body: item });
  }
}
