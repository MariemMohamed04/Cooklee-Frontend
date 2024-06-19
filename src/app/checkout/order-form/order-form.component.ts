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
      phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      area: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    // if (success) {

    // } else {

    // }
  }
}
