import { Component, OnInit } from '@angular/core';
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

  removeItemFromCart(item: CartItem): void {
    this.cartService.removeCartItem(this.cartId, item).subscribe(
      (updatedCart) => {
        console.log('Item removed from cart:', updatedCart);
        this.cartItems = updatedCart.items;
        this.cartService.updateCart(updatedCart);
      },
      (error) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }

  updateCartItemQuantity(item: CartItem, quantity: number): void {
    if (item.quantity + quantity > 0) {
      item.quantity += quantity;
      this.cartService.updateCartItemQuantity(this.cartId, item).subscribe(
        (updatedCart) => {
          console.log('Item quantity updated in cart:', updatedCart);
          this.cartItems = updatedCart.items;
          this.cartService.updateCart(updatedCart);
        },
        (error) => {
          console.error('Error updating item quantity in cart:', error);
          item.quantity -= quantity;
        }
      );
    }
  }

  getCartItemsCount(): number {
    return this.cartItems.length;
  }
}
