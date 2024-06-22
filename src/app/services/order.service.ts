import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Order } from '../models/order';
import { OrderToCreate } from '../models/order-to-create';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = `https://localhost:7212/api/Order`;
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('API error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  createOrder(order: OrderToCreate): Observable<Order> {
    const url = `${this.baseUrl}`;
    return this.http.post<Order>(url, order)
    .pipe(catchError(this.handleError));
  }

  // getOrdersForClient(email: string): Observable<Order> {
  //   const url = `${this.baseUrl}`;
  //   return this.http.get<Order>(url, email)
  //   .pipe(catchError(this.handleError));
  // }

  // getOrderByIdForClient(orderId: number, email: string): Observable<Order> {

  // }
}
