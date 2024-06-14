import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chef } from '../models/chef';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChefPageService {


  private baseUrl = "https://localhost:7212/api/ChefPage";


  
  getPageById(id: string): Observable<Chef> {
    const params = new HttpParams().set('userId', id);
    return this.http.get<Chef>(this.baseUrl +"/PageSettings", {params} );
  }
  

  updatePage(userId: string, chef: Chef): Observable<Chef> {
 
    const params = new HttpParams().set('userId', userId);
    return this.http.post<Chef>(this.baseUrl+"/UpdatePage", chef, { params });
  }



  getPage(userId: string): Observable<Chef> {
   
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Chef>(this.baseUrl+"/GetPage", { params });
  }

  constructor(public http:HttpClient) { }
}
