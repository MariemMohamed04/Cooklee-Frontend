import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { PaymentService } from './../../services/payment.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-order-payment',
  standalone: true,
  imports: [],
  templateUrl: './order-payment.component.html',
  styleUrl: './order-payment.component.css'
})
export class OrderPaymentComponent {

  errorMessage: string = '';
  paymentKey!: string

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService,
    public router: Router,
  ) { }

  PaywithCard() {
    let cartId = this.authService.getClaims().UserId + "-cart"
    let email = this.authService.getClaims().Email
    this.paymentService.getPaymentKey(cartId, email).subscribe(
      data => {
        this.paymentKey = data
        console.log(data)
        window.location.href = `https://accept.paymobsolutions.com/api/acceptance/iframes/852393?payment_token=${this.paymentKey}`;
        this.router.navigateByUrl("/PaymentDone")
      },
      error => console.error('Error: ', error)
    );
  }
}
