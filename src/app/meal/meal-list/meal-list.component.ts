import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MealService } from '../../_services/meal.service';
import { MealsToReturn } from '../../models/meals-to-return';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css'
})
export class MealListComponent implements OnInit {
  meals: MealsToReturn[] = [];

  constructor(
    private mealService: MealService,
    private favoriteService: FavoriteService,
  ) { }

  ngOnInit(): void {
    console.log("2");
    this.loadMeals();
    console.log("3");

  }

  loadMeals(): void {
    console.log("4");

    this.mealService.getMealsOrderedByRate().subscribe(

      (data: MealsToReturn[]) => {
        console.log("5");
        this.meals = data;
    console.log("6");

      },
      (error) => {
    console.log("7");

        console.error('Error fetching meals:', error);
      }
    );
  }


}
