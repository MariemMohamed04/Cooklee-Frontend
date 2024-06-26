import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  email: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  sendCode() {
    this.http.post('https://localhost:7212/api/Account/forgotpassword', { email: this.email }).subscribe(
      response => {
        console.log('Email sent successfully.');
        this.router.navigate(['/repassword']); // Navigate to the next page
      },
      error => {
        console.error('Error sending email:', error);
      }
    );
  }
}
