import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "https://localhost:7212/api/Account";

  constructor(private http: HttpClient) {}

  register(fname:string, lname: string, email: string, password: string, confirmPassword: string): Promise<boolean> {
    const url = `${this.baseUrl}/register`;
    return new Promise<boolean>((resolve) => {
      this.http.post(url, { fname, lname, email, password, confirmPassword }, { responseType: 'text' }).subscribe(
        (response) => {
          localStorage.setItem("token", response);
          resolve(true);
        },
        (error) => {
          console.error("Error occurred during registration:", error);
          resolve(false);
        }
      );
    });
  }


  login(email: string, password: string): Promise<boolean> {
    const url = `${this.baseUrl}/login`;
    return new Promise<boolean>((resolve) => {
      this.http.post(url, { email, password }, { responseType: 'text' }).subscribe(
        (response) => {
          localStorage.setItem("token", response);
          resolve(true);
        },
        (error) => {
          console.error("Error occurred during login:", error);
          resolve(false);
        }
      );
    });
  }
}
