import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../models/cart-item';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { MealService } from '../_services/meal.service';
import { FavoriteItem } from '../models/favorite-item';
import { MealFavorite } from '../models/meal-favorite';
import { MealsToReturn } from '../models/meals-to-return';
import { FavoriteService } from '../services/favorite.service';
import { Favorite } from '../models/favorite';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit {
  favoriteItems: FavoriteItem[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const userId = this.authService.getClaims().UserId;
    this.favoriteService.getUserFavorites(userId).subscribe(
      (data: Favorite) => {
        this.favoriteItems = data.items;
      },
      (error) => {
        console.error('Error fetching favorite items:', error);
      }
    );
  }

  removeFromFavorites(item: FavoriteItem): void {
    const userId = this.authService.getClaims().UserId;
    this.favoriteService.deleteFavoriteItem(userId, item).subscribe(
      (response) => {
        this.favoriteItems = this.favoriteItems.filter(i => i.id !== item.id);
        console.log('Removed from favorites:', response);
      },
      (error) => {
        console.error('Error removing from favorites:', error);
      }
    );
  }

  addToCart(item: FavoriteItem): void {
    const userId = this.authService.getClaims().UserId;

    // Check if the item is already in the cart
    this.cartService.getUserCarts(userId).subscribe(
      (cart) => {
        const existingCartItem = cart.items.find(cartItem => cartItem.id === item.id);
        if (existingCartItem) {
          console.log('Item is already in the cart');
          return;
        }

        const cartItem: CartItem = {
          id: item.id,
          mealName: item.mealName,
          pictureUrl: item.pictureUrl,
          quantity: 1,
          price: item.price
        };

        this.cartService.addCartItem(userId, cartItem).subscribe(
          (response) => {
            console.log('Added to cart:', response);
          },
          (error) => {
            console.error('Error adding to cart:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }
}
