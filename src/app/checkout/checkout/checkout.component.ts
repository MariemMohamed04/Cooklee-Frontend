import { Component } from '@angular/core';
import { OrderItemComponent } from '../order-item/order-item.component';
import { OrderFormComponent } from '../order-form/order-form.component';
import { PaymentComponent } from '../payment/payment.component';
import { OrderTotalComponent } from '../order-total/order-total.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    OrderFormComponent,
    OrderItemComponent,
    PaymentComponent,
    OrderTotalComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

}
