import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../models/meal';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private baseurl = 'https://localhost:7212/api/Meal';

  getMealById(id: number) {
    return this.http.get<Meal>(this.baseurl + id);
  }

  getAll() {
   return this.http.get<Meal[]>(this.baseurl);
  }

  constructor(public http: HttpClient) {}
}
  // getAll(){
  //    return this.http.get<Department[]>(this.baseurl);
  // }

  // getAllMeals() {
  //   return this.http.get<Meal[]>(this.baseurl).subscribe({
  //     next: (data) => console.log(data),
  //     // error: (er) => console.log(er),
  //     // complete: () => console.log("completed")
  //   });
    // getAllMeals(): Observable<Meal[]> {
    // return this.http.get<any>(`${this.baseurl}/orderedbyrate`).pipe(
    //   map((response: any[]) => response.map(item => new meal().fromDto(item)))
    // );





