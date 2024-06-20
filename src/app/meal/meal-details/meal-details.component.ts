import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Meal } from '../../models/meal';
import { MealService } from '../../services/meal.service';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { MealsToReturn } from '../../models/meals-to-return';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-meal-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.css',
})
export class MealDetailsComponent implements OnInit {
  // meal: Meal = new Meal();
  meal: Meal = new Meal(0, "", "", false, 0, 0, "", [], "", 0);
  reviews: Review[] = [];
  newReview: Review = {
    comment: '',
    rate: 1,
    clientId: 2,
    mealId: 0
  };
  cart: Cart = new Cart();

  constructor(
    public mealService: MealService,
    public reviewService: ReviewService,
    public activatedRoute: ActivatedRoute,
    public cartService: CartService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const mealId = +params['id'];
      if (mealId) {
        this.getMeal(mealId);
      }
    });
    // console.log(this.authService.claims.UserId);
  }

  getMeal(mealId: number): void {
    this.mealService.getMealById(mealId).subscribe(
      meal => {
        this.meal = meal;
        this.newReview.mealId = meal.id ?? 0;
        this.getReviews(meal.id??0);
      },
      error => {
        console.error('Error fetching meal', error);
      }
    );
  }

  getReviews(mealId: number): void {
    this.reviewService.getReviewsByMealId(mealId).subscribe(
      reviews => {
        this.reviews = reviews;
      },
      error => {
        console.error('Error fetching reviews', error);
      }
    );
  }

  submitReview(): void {
    this.reviewService.addReview(this.newReview).subscribe(
      (response) => {
        console.log('Review submitted successfully:', response);
        this.getReviews(this.newReview.mealId);
        this.newReview = {
          comment: '',
          rate: 1,
          clientId: 2,
          mealId: this.meal.id??0
        };
      },
      (error) => {
        console.log('Error submitting review:', error);
      }
    );
  }



}

// cartId: string = `${this.authService.getClaims().UserId}-c`;
// addToCart(cartId: string, meals: MealsToReturn) {
//   this.cartId = cartId;
//     //   const favoriteItem: FavoriteItem = {
// //     id: meal.id,
// //     mealName: meal.mealName,
// //     image: meal.image,
// //     price: meal.price
// //   };
// const qyt = 1;
// const cartItem: CartItem = {
//   id: meals.id,
//   mealName: meals.mealName,
//   image: meals.image,
//   quantity: qyt,
//   price: meals.price
// }
//   this.cartService.addCartItem(cartId, cartItem).subscribe({
//     next: (res) => console.log(res),
//     error: (err) => console.log(err)
//   })
// }