import { Component, OnInit } from '@angular/core';
import { MealsToReturn, FavoriteItem, CartItem } from '../../models/meals-to-return';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { MealService } from '../../_services/meal.service';


@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit{

  meals: MealsToReturn[] = [];

  constructor(
    private mealService: MealService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadMeals();
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



  // favoriteItems: any;
  // cartItems: any;
  // constructor(
  //   private authService: AuthService,
  //   private cartService: CartService,
  //   private favoriteService: FavoriteService
  // ) {}

  // addToFavorites(meal: MealsToReturn): void {
  //   if (this.isInFavorites(meal)) {
  //     console.log('Item is already in favorites');
  //     return;
  //   }

  //   const favoriteItem: FavoriteItem = { ...meal, pictureUrl: meal.image };
  //   this.favoriteService.addFavoriteItem(this.authService.getClaims().UserId, favoriteItem)
  //     .subscribe(
  //       (response) => {
  //         console.log('Added to favorites:', response);
  //         this.favoriteItems.push(favoriteItem);

  //         if (!this.isInCart(meal)) {
  //           this.addToCartInternal(meal);
  //         }
  //       },
  //       (error) => {
  //         console.error('Error adding to favorites:', error);
  //       }
  //     );
  // }

  // addToCart(meal: MealsToReturn): void {
  //   if (this.isInCart(meal)) {
  //     console.log('Item is already in cart');
  //     return;
  //   }

  //   this.addToCartInternal(meal);
  // }

  // private addToCartInternal(meal: MealsToReturn): void {
  //   const cartItem: CartItem = { ...meal, pictureUrl: meal.image, quantity: 1 };
  //   this.cartService.addCartItem(this.authService.getClaims().UserId, cartItem)
  //     .subscribe(
  //       (response) => {
  //         console.log('Added to Cart:', response);
  //         this.cartItems.push(cartItem);
  //       },
  //       (error) => {
  //         console.error('Error adding to cart:', error);
  //       }
  //     );
  // }

  // isInFavorites(meal: MealsToReturn): boolean {
  //   return this.favoriteItems.some(item => item.id === meal.id);
  // }

  // isInCart(meal: MealsToReturn): boolean {
  //   return this.cartItems.some(item => item.id === meal.id);
  // }

  // removeFromFavorites(item: FavoriteItem): void {
  //   const userId = this.authService.getClaims().UserId;
  //   this.favoriteService.deleteFavoriteItem(userId, item).subscribe(
  //     (response) => {
  //       this.favoriteItems = this.favoriteItems.filter(i => i.id !== item.id);
  //       console.log('Removed from favorites:', response);

  //       this.cartService.removeFromFavorites(userId, item).subscribe(
  //         (cartResponse) => {
  //           console.log('Removed from cart:', cartResponse);
  //         },
  //         (cartError) => {
  //           console.error('Error removing from cart:', cartError);
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.error('Error removing from favorites:', error);
  //     }
  //   );
  // }

  // removeFromCart(item: CartItem): void {
  //   const userId = this.authService.getClaims().UserId;
  //   this.cartService.deleteCartItem(userId, item).subscribe(
  //     (response) => {
  //       this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  //       console.log('Removed from cart:', response);

  //       this.favoriteService.removeFromCart(userId, item).subscribe(
  //         (favResponse) => {
  //           console.log('Removed from favorites:', favResponse);
  //         },
  //         (favError) => {
  //           console.error('Error removing from favorites:', favError);
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.error('Error removing from cart:', error);
  //     }
  //   );
  // }
}
