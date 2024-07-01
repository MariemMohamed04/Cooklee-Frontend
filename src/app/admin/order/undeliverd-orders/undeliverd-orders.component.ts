import { Component } from '@angular/core';
import { Order, Status } from '../../../models/order';
import { OrderAdminService } from '../../../services/order-admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-undeliverd-orders',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './undeliverd-orders.component.html',
  styleUrl: './undeliverd-orders.component.css'
})
export class UndeliverdOrdersComponent {
  orders: Order[] = [];
  Status = Status;
  status: string = 'Pending';

  constructor(
    public orderService: OrderAdminService
  ) {}

  ngOnInit(): void {
    this.loadOrders();

  }

  loadOrders(): void {
    this.orderService.GetUndeliverdOrders().subscribe(
      (data: any) => {
        this.orders = data;
        console.log('Success');
        console.log(this.orders);
      },
      (error) => {
        console.error('Error loading orders', error);
      }
    );
  }

  changeOrderStatus(orderId: number, clientEmail: string): void {
    this.orderService.ChangeOrderStatus(orderId, clientEmail).subscribe(
      (response: any) => {
        console.log('Order status changed successfully:', response);
        // Optionally, you can reload orders or update the UI to reflect the status change
        this.loadOrders();
      },
      (error) => {
        console.error('Error changing order status:', error);
      }
    );
  }
}
