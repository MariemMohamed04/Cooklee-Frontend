import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Chef } from '../../models/chef';
import { Feedback } from '../../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class AdminChefService {

  private baseUrl = 'https://localhost:7212/api/AdminChef';
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('API error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  GetUnActivePages(): Observable<Chef[]> {
    return this.http.get<Chef[]>(`${this.baseUrl}/UnActivePages`)
    .pipe(catchError(this.handleError));
  }

  ActivatePage(chefId: number): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/ActivatePage`, null, {
      params: { chefId: chefId.toString() }
    }).pipe(catchError(this.handleError));
  }

  SendFeedback(chefId: number, body: Feedback): Observable<any> {
    const url = `${this.baseUrl}/SendFeedback?chefId=${chefId}`;
    return this.http.post<any>(url, body)
      .pipe(catchError(this.handleError));
  }
}
