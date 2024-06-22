import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderToCreate } from '../../models/order-to-create';
import { ShipmentDetails } from '../../models/shipment-details';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

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
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  errorMessage: string = '';
  clientEmail: string;
  cartId: string;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.clientEmail = this.authService.getClaims().Email;
    this.cartId = `${this.authService.getClaims().UserId}-cart`;
    this.orderForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      street: ['', Validators.required],
      building: ['', Validators.required],
      apartment: ['', Validators.required],
      floor: ['', Validators.required],
      country: ['Egypt', Validators.required],
      state: ['Alexandria', Validators.required],
      city: ['Alexandria Governorate', Validators.required],
      shippingmethod: ['PKG', Validators.required],
      postalCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.orderForm.invalid) {
      return;
    }

    const shipmentDetails = new ShipmentDetails(
      this.orderForm.value.fname,
      this.orderForm.value.lname,
      this.orderForm.value.email,
      this.orderForm.value.phone,
      this.orderForm.value.street,
      this.orderForm.value.building,
      this.orderForm.value.apartment,
      this.orderForm.value.floor,
      this.orderForm.value.city,
      this.orderForm.value.country,
      this.orderForm.value.state,
      this.orderForm.value.shippingmethod,
      this.orderForm.value.postalCode
    );

    const orderToCreate = new OrderToCreate(
      this.clientEmail,
      this.cartId,
      shipmentDetails
    );

    console.log('Order Payload:', JSON.stringify(orderToCreate, null, 2));

    this.orderService.createOrder(orderToCreate).subscribe({
      next: (order) => {
        console.log('Order created successfully:', order);
      },
      error: (error) => {
        console.error('Error creating order:', error);
        this.errorMessage = 'There was an error creating your order. Please try again later.';
      }
    });
  }
}