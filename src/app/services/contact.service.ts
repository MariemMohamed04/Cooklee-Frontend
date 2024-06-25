import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class contactUsService {
    private contactUsUrlEndpoint = 'https://localhost:7212/api/ContactUs/send';
    constructor(private http:HttpClient)
    {

    }
    sendEmail(contactDto: any): Observable<any> {
        return this.http.post<any>(`${this.contactUsUrlEndpoint}`, contactDto)
          .pipe(
            catchError(this.handleError) 
          );
      }
    
      private handleError(error: any): Observable<any> {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.'); 
      }
        
}
export interface ContactUsDto {
    fullName: string;
    phoneNumber: string;
    body: string;
}