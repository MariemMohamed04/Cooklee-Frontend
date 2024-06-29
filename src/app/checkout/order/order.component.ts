import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ShipmentDetails } from '../../models/shipment-details';
import { OrderPreviewComponent } from '../order-preview/order-preview.component';
import { AuthService } from '../../services/auth.service';
import { PaymentService } from '../../services/payment.service';
import { OrderItemComponent } from '../order-item/order-item.component';
import { OrderTotalComponent } from '../order-total/order-total.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports:
    [
      RouterLink,
      OrderItemComponent,
      OrderTotalComponent
    ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  errorMessage: string = '';
  shipmentDetails!: ShipmentDetails
  paymentKey!: string

  constructor(
    public router: Router,
    public paymentService: PaymentService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    let email = this.authService.getClaims().Email
    this.paymentService.getshipmentDet(email).subscribe(
      data => {
        this.shipmentDetails = data
      },
      error => console.error('Error: ', error)
    )
  }
}
