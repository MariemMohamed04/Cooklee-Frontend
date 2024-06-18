import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

declare const google: any;
declare global {
  interface PromptMomentNotification {
    getMoment(): string;
  }

  interface CredentialResponse {
    credential?: {
      id: string;
      name?: string;
      email?: string;
      picture?: string;
    };
    select_by?: 'user' | 'google';
    client_id: string;
  }
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent /*implements OnInit*/ {
  isLoading: boolean = false;
  loginForm: FormGroup;
  errorMessage: string = '';
  // isNotValidForm: boolean = false;

  constructor(private authService: AuthService, private _router: Router, private _ngZone: NgZone) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
      .then(({ success, error }) => {
        if (success) {
          this.isLoading = true;
          this._router.navigate(['/ClientForm']);
        } else {
          this.errorMessage = error || 'Logging in failed. Please try again.';
          // this.isNotValidForm = true;
        }
      });
  }

  ngOnInit(): void {
    console.log("debug4");
    window.onload = () => {
    console.log("debug5");
      google.accounts.id.initialize({
        client_id: `18100862023-271anqbtcmm1a5hmfbpuj67unofcgqb5.apps.googleusercontent.com`,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
    console.log("debug6");
      google.accounts.id.renderButton(
        document.getElementById("googleButton"),
        { theme: "outline", size: "large", width: "100%" }
      );
    console.log("debug7");
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    console.log("debug8");
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    console.log("debug9");
    if (response.credential) {
      await this.authService.loginWithGoogle(response).subscribe(
        (x: any) => {
    console.log("debug10");
          localStorage.setItem("token", x.token);
    console.log("debug11");
          this._ngZone.run(() => {
            this._router.navigate(['/ClientForm']);
          });
    console.log("debug12");
        },
        (error: any) => {
    console.log("debug13");
          console.error("Error during Google login:", error);
          this.errorMessage = error?.error?.message || 'Google login failed. Please try again.';
        }
      );
    }
  }


}
