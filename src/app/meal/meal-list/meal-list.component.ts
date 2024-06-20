import { Component, OnInit } from '@angular/core';
import {
  MealsToReturn
} from '../../models/meals-to-return';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { MealService } from '../../services/meal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meal } from '../../models/meal';
import { RouterLink, Router } from '@angular/router';
import { FavoriteItem } from '../../models/favorite-item';

@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css'],
})
export class MealListComponent implements OnInit {
  meals: MealsToReturn[] = [];
  favoriteId: string = '';

  constructor(
    private mealService: MealService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

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
  goToMealDetails(mealId: number): void {
    this.router.navigate(['/Meals/Details', mealId]);
  }
  addToFavorite(meal: MealsToReturn): void {

    const favoriteItem: FavoriteItem = {
      id: meal.id,
      mealName: meal.mealName,
      image: meal.image,
      price: meal.price
    };
    // `${claims.UserId}Fav`
    this.favoriteId = `${this.authService.getClaims().UserId}Fav`;
    this.favoriteService.addFavoriteItem(this.favoriteId, favoriteItem).subscribe(
      (response) => {
        console.log('Meal added to favorites:', response);
      },
      (error) => {
        console.error('Error adding meal to favorites:', error);
      }
    );
  }
}
