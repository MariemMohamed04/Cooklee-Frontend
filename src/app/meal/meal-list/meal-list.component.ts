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

@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
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

    const favoriteItem: FavoriteItem = {
      id: meal.id,
      mealName: meal.mealName,
      pictureUrl: meal.image,
      price: meal.price
    };

    this.favoriteService.addFavoriteItem(this.authService.getClaims().UserId, favoriteItem)
      .subscribe(
        (response) => {
          this.favoriteItems.push(favoriteItem);
          console.log('Added to favorites:', response);
        },
        (error) => {
          console.error('Error adding to favorites:', error);
        }
      );
  }

  addToCart(meal: MealsToReturn): void {
    if (this.isInCart(meal)) {
      console.log('Item is already in cart');
      return;
    }

    const cartItem: CartItem = {
      id: meal.id,
      mealName: meal.mealName,
      pictureUrl: meal.image,
      quantity: 1,
      price: meal.price
    };

    this.cartService.addCartItem(this.authService.getClaims().UserId, cartItem)
      .subscribe(
        (response) => {
          this.cartItems.push(cartItem);
          console.log('Added to Cart:', response);
        },
        (error) => {
          console.error('Error adding to cart:', error);
        }
      );
  }
}
