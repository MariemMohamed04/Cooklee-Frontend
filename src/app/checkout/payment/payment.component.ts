import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ShipmentDetails } from '../../models/shipment-details';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { Cart } from '../../models/cart';
import { routes } from '../../app.routes';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {

  errorMessage: string = '';
  shipmentDetails!:ShipmentDetails
  paymentKey!:string
  constructor(
    public router:Router,
    public paymentService :PaymentService,
    public authService: AuthService
  ) {

  }


  ngOnInit(): void {
    let email = this.authService.getClaims().Email
   this.paymentService.getshipmentDet(email).subscribe(
    data=>{this.shipmentDetails = data

    },
    error => console.error('Error: ', error)
   )
  }


  PaywithCard(){


    let cartId = this.authService.getClaims().UserId+"-cart"
    let email = this.authService.getClaims().Email
 this.paymentService.getPaymentKey(cartId, email ).subscribe(
      data=> {  this.paymentKey = data
        console.log(data)
      window.location.href = `https://accept.paymobsolutions.com/api/acceptance/iframes/852393?payment_token=${this.paymentKey}`;
      this.router.navigateByUrl("/PaymentDone")

      },

      error => console.error('Error: ', error)

 );



  }

 PaywithCash(){

 }
}
