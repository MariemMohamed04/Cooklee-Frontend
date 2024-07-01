import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { session } from '../models/session';
import { jwtDecode } from 'jwt-decode';
import { Session } from '../interfaces/Session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public claims = new session(false, "", "", [], "")
  user!: { isAuthenticated: boolean; Name: string; Email: string; Roles: string[]; UserId: string; };
  private baseUrl = "https://localhost:7212/api/Account";
  constructor(private http: HttpClient) { }


  register(email: string, password: string, confirmPassword: string): Promise<{ success: boolean, error?: string }> {
    const url = `${this.baseUrl}/register`;
    return new Promise<{ success: boolean, error?: string }>((resolve) => {
      console.log('before post');
      this.http.post(url, { email, password, confirmPassword }).subscribe(
        (response: any) => {
          localStorage.setItem("token", response.token);
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

  getClaims(): session {
    let token = localStorage.getItem("token");
    if (typeof token === 'string' && token) {
      this.claims.isAuthenticated = true
      this.user = jwtDecode(token);
      this.claims.Email = this.user?.Email
      this.claims.Name = this.user.Name
      this.claims.UserId = this.user.UserId
      this.claims.Roles = this.user.Roles
    }
    return this.claims;
  }

  forgotPassword(email: string): Promise<{ success: boolean, message?: string, error?: string }> {
    const url = `${this.baseUrl}/forgotpassword`;
    return new Promise<{ success: boolean, message?: string, error?: string }>((resolve) => {
      this.http.post(url, { email }).subscribe(
        (response: any) => {
          resolve({ success: true, message: response.message });
        },
        (error) => {
          console.error("Error occurred during password reset request:", error);
          let errorMessage = 'An error occurred. Please try again.';
          if (error.error && error.error.error) {
            errorMessage = error.error.error;
          }
          resolve({ success: false, error: errorMessage });
        }
      );
    });
  }

  getNewClaims(): any {
    let token = localStorage.getItem("token");
    if (typeof token === 'string' && token) {
      this.claims.isAuthenticated = true;
      this.user = jwtDecode(token);
      this.claims.Email = this.user?.Email;
      this.claims.Name = this.user.Name;
      this.claims.UserId = this.user.UserId;
      this.claims.Roles = this.user.Roles;
    }
    return this.claims;
  }

  resetPassword(email: string, resetCode: string, password: string, confirmPassword: string): Promise<{ success: boolean, message?: string, error?: string }> {
    const url = `${this.baseUrl}/resetpassword`;
    const userId = this.getNewClaims().UserId; // Get the userId from claims

    return new Promise<{ success: boolean, message?: string, error?: string }>((resolve) => {
      this.http.post(url, { email, resetCode, password, confirmPassword, userId }).subscribe(
        (response: any) => {
          resolve({ success: true, message: response.message });
        },
        (error: HttpErrorResponse) => {
          console.error("Error occurred during password reset:", error);
          let errorMessage = 'An error occurred. Please try again.';
          if (error.error && error.error.errors && error.error.errors.length > 0) {
            errorMessage = error.error.errors[0];
          } else if (error.error && error.error.error) {
            errorMessage = error.error.error;
          }
          resolve({ success: false, error: errorMessage });
        }
      );
    });
  }
}
