import { CommonModule } from '@angular/common';
import { Order, Status } from '../../../models/order';
import { AdminOrderService } from './../../../services/admin/admin-order.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { OrderAdminService } from '../../../services/order-admin.service';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [
    CommonModule
  ],
  providers: [AdminOrderService], // Add this line
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit {
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
    this.orderService.GetAllOrders().subscribe(
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
