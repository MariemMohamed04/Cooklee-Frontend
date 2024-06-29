import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
  selector: 'app-payment-done',
  standalone: true,
  imports:
  [
    RouterLink,
    OrderItemComponent
  ],
  templateUrl: './payment-done.component.html',
  styleUrl: './payment-done.component.css'
})
export class PaymentDoneComponent {

}
