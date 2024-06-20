import { Component, OnInit } from '@angular/core';
import { MealsToReturn } from '../../models/meals-to-return';
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
  favoriteItems: FavoriteItem[] = [];


  constructor(
    private mealService: MealService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMeals();
    // this.loadFavoriteItemsFromLocalStorage();
  }

  // loadFavoriteItemsFromLocalStorage(): void {
  //   const storedItems = localStorage.getItem('favoriteItems');
  //   if (storedItems) {
  //     this.favoriteItems = JSON.parse(storedItems);
  //   }
  // }

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

  // loadFavoriteItems(): void {
  //   this.favoriteId = `${this.authService.getClaims().UserId}-f`;
  //   this.favoriteService.getFavoriteItems(this.favoriteId).subscribe(
  //     (favorite) => {
  //       this.favoriteItems = favorite.items;
  //     },
  //     (error) => {
  //       console.error('Error fetching favorite items:', error);
  //     }
  //   );
  // }

  // addToFavorite(meal: MealsToReturn): void {
  //   const favoriteItem: FavoriteItem = {
  //     id: meal.id,
  //     mealName: meal.mealName,
  //     image: meal.image,
  //     price: meal.price
  //   };

  //   if (this.isMealInFavorites(meal.id)) {
  //     console.log('Meal is already in favorites.');
  //     return;
  //   }

  //   this.favoriteService.addFavoriteItem(this.favoriteId, favoriteItem).subscribe(
  //     (response) => {
  //       console.log('Meal added to favorites:', response);
  //       this.favoriteItems.push(favoriteItem);
  //     },
  //     (error) => {
  //       console.error('Error adding meal to favorites:', error);
  //     }
  //   );
  // }

  // addToFavorite(meal: MealsToReturn): void
  // {
  //   const favoriteItem: FavoriteItem = {
  //     id: meal.id,
  //     mealName: meal.mealName,
  //     image: meal.image,
  //     price: meal.price
  //   };

  //   if (this.isMealInFavorites(meal.id)) {
  //     console.log('Meal is already in favorites.');
  //     return;
  //   }

  //   // Add the favorite item to the array in memory
  //   this.favoriteItems.push(favoriteItem);

  //   // Store updated favorite items in localStorage
  //   localStorage.setItem('favoriteItems', JSON.stringify(this.favoriteItems));

  //   this.favoriteService.addFavoriteItem(this.favoriteId, favoriteItem).subscribe(
  //     (response) => {
  //       console.log('Meal added to favorites:', response);
  //     },
  //     (error) => {
  //       console.error('Error adding meal to favorites:', error);
  //     }
  //   );
  // }

  // isMealInFavorites(mealId: number): boolean {
  //   return this.favoriteItems.some(item => item.id === mealId);
  // }


  goToMealDetails(mealId: number): void {
    this.router.navigate(['/Meals/Details', mealId]);
  }
}