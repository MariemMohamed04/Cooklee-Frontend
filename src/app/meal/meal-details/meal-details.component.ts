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
  meal: Meal = new Meal();
  reviews: Review[] = [];
  newReview: Review = {
    comment: '',
    rate: 1,
    clientId: 2,
    mealId: 0
  };

  constructor(
    public mealService: MealService,
    public reviewService: ReviewService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const mealId = +params['id'];
      if (mealId) {
        this.getMeal(mealId);
      }
    });
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
