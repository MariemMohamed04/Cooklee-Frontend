import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ShipmentDetails } from '../../models/shipment-details';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
 
  errorMessage: string = '';
  shipmentDetails!:ShipmentDetails
  paymentKey!:string
  constructor() {
   
  }

  onSubmit() {
    // if (success) {

    // } else {

    // }
  }

  PaywithCard(){

 
 
    this.paymentKey = ""
    window.location.href = `https://accept.paymobsolutions.com/api/acceptance/iframes/852393?payment_token=${this.paymentKey}`;


  }

 PaywithCash(){

 }
}
