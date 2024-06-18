import { Component, OnInit } from '@angular/core';
import { MealService } from '../../_services/meal.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MealsToReturn } from '../../models/meals-to-return';
import { FavoriteService } from '../../services/favorite.service';
import { AuthService } from '../../services/auth.service';
import { FavoriteItem } from '../../models/favorite-item';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { Cart } from '../../models/cart';
import { Favorite } from '../../models/favorite';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css',
})
export class MealListComponent implements OnInit {
  meals: MealsToReturn[] = [];
  favoriteItems: FavoriteItem[] = [];
  cartItems: CartItem[] = [];

  

  constructor(
    private mealService: MealService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadMeals();
    this.loadFavorites();
    this.loadCart();
  }

  loadMeals(): void {
    this.mealService.getMealsOrderedByRate().subscribe(
      (data: MealsToReturn[]) => {
        this.meals = data;
      },
      (error) => {
        console.error('Error fetching meals:', error);
      }
    );
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

  loadCart(): void {
    const userId = this.authService.getClaims().UserId;
    this.cartService.getUserCarts(userId).subscribe(
      (data: Cart) => {
        this.cartItems = data.items;
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  isInCart(meal: MealsToReturn): boolean {
    return this.cartItems.some(item => item.id === meal.id);
  }

  isInFavorites(meal: MealsToReturn): boolean {
    return this.favoriteItems.some(item => item.id === meal.id);
  }

  addToFavorites(meal: MealsToReturn): void {
    if (this.isInFavorites(meal)) {
      console.log('Item is already in favorites');
      return;
    }
console.log("1");
    const favoriteItem: FavoriteItem = {
      id: meal.id,
      mealName: meal.mealName,
      pictureUrl: meal.image,
      price: meal.price
    };
    console.log("2");

    // Add to favorites
    this.favoriteService.addFavoriteItem(this.authService.getClaims().UserId, favoriteItem)
      .subscribe(
        (response) => {
    console.log("push into fav");

          this.favoriteItems.push(favoriteItem);
          console.log('Added to favorites:', response);
          console.log("3");

          // Also add to cart if not already in cart
          if (!this.isInCart(meal)) {
console.log("4");

            this.addToCartInternal(meal);
console.log("5");

          }
        },
        (error) => {
          console.error('Error adding to favorites:', error);
        }
      );
  }

  addToCart(meal: MealsToReturn): void {
    console.log("9");

    if (this.isInCart(meal)) {
      console.log('Item is already in cart');
      return;
    }
    console.log("10");

    this.addToCartInternal(meal);
    console.log("11");

  }

  private addToCartInternal(meal: MealsToReturn): void {
    console.log("12");

    const cartItem: CartItem = {
      id: meal.id,
      mealName: meal.mealName,
      pictureUrl: meal.image,
      quantity: 1,
      price: meal.price
    };
    console.log("13");

    // Add to cart
    this.cartService.addCartItem(this.authService.getClaims().UserId, cartItem)
      .subscribe(
        (response) => {
    console.log("17");

          this.cartItems.push(cartItem);
          console.log('Added to Cart:', response);
        },
        (error) => {
          console.error('Error adding to cart:', error);
        }
      );
  }

  removeFromCart(meal: MealsToReturn): void {
    const cartItem = this.cartItems.find(item => item.id === meal.id);
    if (!cartItem) {
      console.log('Item not found in cart');
      return;
    }

    this.cartService.deleteCartItem(this.authService.getClaims().UserId, cartItem)
      .subscribe(
        (response) => {
          this.cartItems = this.cartItems.filter(item => item.id !== meal.id);
          console.log('Removed from cart:', response);
        },
        (error) => {
          console.error('Error removing from cart:', error);
        }
      );
  }

  removeFromFavorites(meal: MealsToReturn): void {
    const favoriteItem = this.favoriteItems.find(item => item.id === meal.id);
    if (!favoriteItem) {
      console.log('Item not found in favorites');
      return;
    }

    this.favoriteService.deleteFavoriteItem(this.authService.getClaims().UserId, favoriteItem)
      .subscribe(
        (response) => {
          this.favoriteItems = this.favoriteItems.filter(item => item.id !== meal.id);
          console.log('Removed from favorites:', response);
        },
        (error) => {
          console.error('Error removing from favorites:', error);
        }
      );
  }
}
