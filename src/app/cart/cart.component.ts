import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartId: string = `${this.authService.getClaims().UserId}-cart`;
  cartSubscription: any;

  constructor(private cartService: CartService, private authService: AuthService) {}

  // ngOnInit(): void {
  //   this.loadCartItems();
  // }

  // loadCartItems(): void {
  //   this.cartService.getCart(this.cartId).subscribe(
  //     (cart) => {
  //       this.cartItems = cart.items;
  //     },
  //     (error) => {
  //       console.error('Error loading cart items:', error);
  //     }
  //   );
  // }

  // getCartItemsCount(): number {
  //   return this.cartService.getCartItemsCount();
  // }

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
        // Update cart items count in CartService
        this.cartService.updateCart(cart);
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  // Function to get the number of cart items
  getCartItemsCount(): number {
    return this.cartItems.length; // Use cartItems directly
  }
}
