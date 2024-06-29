import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CartItem } from '../../models/cart-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports:
  [
    CommonModule
  ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})
export class OrderItemComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartId: string = `${this.authService.getClaims().UserId}-cart`;
  cartSubscription: any;

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.cartSubscription = this.cartService.cart$.subscribe(
      (cart) => {
        this.cartItems = cart.items;
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  loadCartItems(): void {
    this.cartService.getCart(this.cartId).subscribe(
      (cart) => {
        this.cartItems = cart.items;
        this.cartService.updateCart(cart);
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }
}
