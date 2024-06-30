import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css'
})
export class OrderStatusComponent {
  state: number = 0;
  stateMax: number = 4;

  next(): void {
    if (this.state < this.stateMax) {
      this.state++;
    }
  }

  back(): void {
    if (this.state > 0) {
      this.state--;
    }
  }
}
