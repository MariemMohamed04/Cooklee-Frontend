import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {


  private baseUrl = "https://localhost:7212/api/ClientProfile";


  
  getUserById(id: string): Observable<Client> {
    const params = new HttpParams().set('userId', id);
    return this.http.get<Client>(this.baseUrl +"/ProfileSettings", {params} );
  }
  

  updateProfile(userId: string, client: Client): Observable<Client> {
 
    const params = new HttpParams().set('userId', userId);
    return this.http.post<Client>(this.baseUrl+"/UpdateProfile", client, { params });
  }

  getProfile(userId: string): Observable<Client> {
   
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Client>(this.baseUrl+"/GetProfile", { params });
  }

  constructor(public http:HttpClient) { }
}
