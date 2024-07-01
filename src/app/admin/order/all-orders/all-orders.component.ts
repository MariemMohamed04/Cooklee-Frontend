import { CommonModule } from '@angular/common';
import { Order } from '../../../models/order';
import { AdminOrderService } from './../../../services/admin/admin-order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit{
  orders: Order[] = [];
  constructor(
    private adminOrderService:AdminOrderService
  ) {}

  ngOnInit(): void {

  }

  loadOrders(): void {
    this.adminOrderService.GetAllOrders().subscribe(
      (data: any) => {
        this.orders = data;
        console.log('Success');
      },
      (error) => {
        console.error('Error loading orders', error);
      }
    );
  }

}
