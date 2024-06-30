import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Chef } from '../../models/chef';

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

  sendFeedback(chefId: number, feedbackText: string): Observable<any> {
    const body = { chefId, body: feedbackText };
    return this.http.post<any>(`${this.baseUrl}/SendFeedback`, body, {
      params: { chefId: chefId.toString() }
    })
      .pipe(
        catchError(this.handleError)
      );
  }

}









// SendFeedback(chefId: number, body: string): Observable<any> {
//   const params = new HttpParams().set('chefId', chefId.toString());
//   return this.http.post<boolean>(`${this.baseUrl}/SendFeedback`, body, { params }).pipe(
//     catchError(this.handleError)
//   );
// }



// SendFeedback(chefId: number, body: string): Observable<any> {
//   return this.http.post<boolean>(`${this.baseUrl}/SendFeedback`, body, {
//     params: { chefId: chefId.toString() }
//   }).pipe(catchError(this.handleError));
// }

  // SendFeedback(chefId: number, body: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/SendFeedback?chefId=${chefId}`, { body }, {
  //     params: { chefId: chefId.toString() }
  //   }).pipe(catchError(this.handleError));
  // }

  // sendFeedback(chefId: number, feedback: string): Observable<any> {
  //   // Prepare the feedback data
  //   const formData = new FormData();
  //   formData.append('chefId', chefId.toString());
  //   formData.append('feedback', feedback);

  //   // Make the HTTP POST request
  //   return this.http.post<any>(`${this.baseUrl}/SendFeedback?chefId=${chefId}`, formData);
  // }

  // sendFeedback(chefId: number, feedback: any) {
  //   const url = `${this.baseUrl}/SendFeedback?chefId=${chefId}`;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.post(url, feedback, { headers });
  // }

  // sendFeedback(chefId: number, feedback: string): Observable<any> {
  //   const body = { chefId, feedback }; // Create JSON object
  //   return this.http.post<any>(`${this.baseUrl}/SendFeedback`, body);
  // }

  // sendFeedback(chefId: number, formData: FormData): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/SendFeedback?chefId=${chefId}`, formData);
  // }