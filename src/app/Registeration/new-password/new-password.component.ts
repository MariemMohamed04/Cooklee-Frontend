import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})

export class NewPasswordComponent implements OnInit {
  email: string = '';
  resetCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  error: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve email from query parameters
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  resetPassword() {
    // Call AuthService to reset password
    this.authService.resetPassword(this.email, this.resetCode, this.newPassword, this.confirmPassword)
      .then((response) => {
        if (response.success) {
          this.message = response.message!;
          // Optionally redirect to login page after successful reset
          setTimeout(() => this.router.navigate(['/login']), 3000);
        } else {
          this.error = response.error!;
        }
      })
      .catch((error) => {
        console.error("Error occurred during password reset:", error);
        this.error = 'An error occurred. Please try again.';
      });
  }
}
