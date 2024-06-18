import { Component, OnInit } from '@angular/core';
import { Meal } from '../../models/meal';
import { MealService } from '../../_services/meal.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../Core/header/header.component';
import { CommonModule } from '@angular/common';
import { MealsToReturn } from '../../models/meals-to-return';
import { FavoriteService } from '../../services/favorite.service';
import { AuthService } from '../../services/auth.service';
import { FavoriteItem } from '../../models/favorite-item';

@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [RouterLink, CommonModule], //CommonModule
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css',
})
export class MealListComponent implements OnInit {
  meals: MealsToReturn[] = [];
  meal: MealsToReturn = new MealsToReturn(0,"","",false,0,0,"",[],"",0);
  constructor(
    private mealService: MealService,
    private favoriteService: FavoriteService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.mealService.getMealsOrderedByRate().subscribe(
      (data: MealsToReturn[]) => {
        this.meals = data;
        console.log(this.meals);
      },
      (error) => {
        console.error('Error fetching meals:', error);
      }
    );
  }

  // Example method to capture clicked meal data
onMealClick(meal: MealsToReturn) {
  this.meal = meal;
}


AddToFavorite(meal: MealsToReturn) {
  console.log("1");
  const userId = this.authService.getClaims().UserId;
  console.log("2");

  if (!userId) {
    console.log("User ID is missing");
    return;
  }
  console.log("3");

  const favoriteId = `3a972885-d629-4503-a172-29f069be095d`;
  console.log("4");

  const favoriteItem: FavoriteItem = new FavoriteItem(
    meal.id,
    meal.mealName,
    meal.image,
    meal.price
  );
  console.log("5");

  if (!favoriteId) {
    console.log("Favorite ID is missing");
    return;
  }
  console.log("6");

  this.favoriteService.AddFavoriteItem(favoriteId, favoriteItem).subscribe({
    next: (data) => {
      console.log("Item added to favorites:", data);
      // Optionally, update UI or provide feedback to the user
    },
    error: (error) => {
      console.error('Error adding item to favorites:', error);
      // Handle error gracefully, e.g., show a user-friendly message
    }
  });
}



}
