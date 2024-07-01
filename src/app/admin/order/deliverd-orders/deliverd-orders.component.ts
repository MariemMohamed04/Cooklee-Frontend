import { Component, OnInit } from '@angular/core';
import { Order, Status } from '../../../models/order';
import { OrderAdminService } from '../../../services/order-admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deliverd-orders',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './deliverd-orders.component.html',
  styleUrl: './deliverd-orders.component.css'
})
export class DeliverdOrdersComponent implements OnInit {

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
    this.orderService.GetDeliverdOrders().subscribe(
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

}
