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

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    // this.loadCarts();
  }

  // loadCarts(): void {
  //   const userId = this.authService.getClaims().UserId;
  //   this.cartService.getUserCarts(userId).subscribe(
  //     (data: Cart) => {
  //       this.cartItems = data.items;
  //     },
  //     (error) => {
  //       console.error('Error fetching cart items:', error);
  //     }
  //   );
  // }

  // removeFromCarts(item: CartItem): void {
  //   const userId = this.authService.getClaims().UserId;
  //   this.cartService.deleteCartItem(userId, item).subscribe(
  //     (response) => {
  //       this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  //       console.log('Removed from carts:', response);

  //       // Also remove from favorites if exists
  //       this.cartService.removeFromFavorites(userId, item).subscribe(
  //         (favResponse) => {
  //           console.log('Removed from favorites:', favResponse);
  //           // Update favorites list if needed
  //         },
  //         (favError) => {
  //           console.error('Error removing from favorites:', favError);
  //         }
  //       );

  //     },
  //     (error) => {
  //       console.error('Error removing from carts:', error);
  //     }
  //   );
  // }
}
