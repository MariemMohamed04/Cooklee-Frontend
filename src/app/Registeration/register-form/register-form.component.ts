import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent {
  isLoading: boolean = false;
  registerForm: FormGroup;
  errorMessage: string = '';


  constructor(private authService: AuthService, private _router: Router) {
    this.registerForm = new FormGroup({
      fname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      lname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
    });
  }

onSubmit() {
  const { fname, lname, email, password, confirmPassword } = this.registerForm.value;
  this.authService.register(fname, lname, email, password, confirmPassword)
    .then((success) => {
      if (success) {
        this.isLoading = true;
        this._router.navigate(['/login']);
        // Handle successful registration
      } else {
        // Handle registration failure
        this.errorMessage = 'Registration failed. Please try again.';
      }
    })
    .catch((error) => {
      // Handle registration error
      this.errorMessage = error.error.message; // Assuming error structure matches your provided example
    });
}

}
