import { Component } from '@angular/core';
import { OrderItemComponent } from '../order-item/order-item.component';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    OrderFormComponent,
    OrderItemComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

}
