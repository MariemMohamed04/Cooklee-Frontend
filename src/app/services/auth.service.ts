import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "https://localhost:7212/api/Account";
  constructor(private http: HttpClient) {}

  register(email: string, password: string, confirmPassword: string): Promise<{ success: boolean, error?: string }> {
    const url = `${this.baseUrl}/register`;
    return new Promise<{ success: boolean, error?: string }>((resolve) => {
      this.http.post(url, { email, password, confirmPassword }).subscribe(
        (response) => {
          localStorage.setItem("token", response as string);
          resolve({ success: true });
        },
        (error) => {
          console.error("Error occurred during registration:", error);
          let errorMessage = 'An error occurred. Please try again.';
          if (error.error && error.error.errors && error.error.errors.length > 0) {
            errorMessage = error.error.errors[0];
          }
          resolve({ success: false, error: errorMessage });
        }
      );
    });
  }

  login(email: string, password: string): Promise<{ success: boolean, error?: string }> {
    const url = `${this.baseUrl}/login`;
    return new Promise<{ success: boolean, error?: string }>((resolve) => {
      this.http.post(url, { email, password }, { responseType: 'text' }).subscribe(
        (response) => {
          localStorage.setItem("token", response as string);
          resolve({ success: true });
        },
        (error) => {
          console.error("Error occurred during login:", error);
          let errorMessage = 'An error occurred. Please try again.';
          if (error.error && error.error.errors && error.error.errors.length > 0) {
            errorMessage = error.error.errors[0];
          }
          resolve({ success: false, error: errorMessage });
        }
      );
    });
  }

  loginWithGoogle(credentials: CredentialResponse): Observable<any> {
    console.log("debug1");
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("debug2");

    return this.http.post(`${this.baseUrl}/loginWithGoogle`, { credential: credentials.credential }, { headers });
    console.log("debug3");

  }



  logoutExternal = () => {
    localStorage.removeItem("token");
    console.log("Token Deleted");
  }

}
