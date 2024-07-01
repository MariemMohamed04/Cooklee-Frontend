import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderAdminService {
  private baseUrl = 'https://localhost:7212/api/AdminOrder';
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('API error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  GetAllOrders(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get<any>(url)
    .pipe(catchError(this.handleError));
  }

  GetUndeliverdOrders(): Observable<any> {
    const url = `${this.baseUrl}/UndeliverdOrders`;
    return this.http.get<any>(url)
    .pipe(catchError(this.handleError));
  }

  GetDeliverdOrders(): Observable<any> {
    const url = `${this.baseUrl}/DeliverdOrders`;
    return this.http.get<any>(url)
    .pipe(catchError(this.handleError));
  }

  ChangeOrderStatus(orderId: number, clientEmail: string): Observable<any> {
    const url = `${this.baseUrl}/ChangeStatus`;
    let params = new HttpParams()
      .set('orderId', orderId.toString())
      .set('ClientEmail', clientEmail);
    return this.http.put<any>(url, {}, { params: params })
      .pipe(catchError(this.handleError));
  }

}
