import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  orderForm: FormGroup;
  errorMessage: string = '';

  constructor() {
    this.orderForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      street: new FormControl('', [Validators.required]),
      building: new FormControl('', [Validators.required]),
      floor: new FormControl('', [Validators.required]),
      apartment: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    // if (success) {

    // } else {

    // }
  }
}
