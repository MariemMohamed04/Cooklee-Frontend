import { AdminMealService } from './../../../services/admin/admin-meal.service';
import { Component, OnInit } from '@angular/core';
import { Meal } from '../../../models/meal';
import { CommonModule } from '@angular/common';
import { Chef } from '../../../models/chef';

@Component({
  selector: 'app-unaccept-meal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './unaccept-meal.component.html',
  styleUrl: './unaccept-meal.component.css'
})
export class UnacceptMealComponent implements OnInit {
  chefs: Chef[] = [];
  meals: Meal[] = [];
  feedbackText: string = '';
  declinedMap: { [key: number]: boolean } = {};

  constructor(
    private adminMealService: AdminMealService
  ) {}

  ngOnInit(): void {
    this.loadMeals();
  }

  loadMeals(): void {
    this.adminMealService.GetUnAcceptedMeals().subscribe(
      (data: Meal[]) => {
        this.meals = data;
        alert('Meals loaded');
      },
      (error) => {
        alert('Error loading meals');
      }
    );
  }

  acceptMeal(chefId: number, mealId: number): void {
    this.adminMealService.AcceptMeal(chefId, mealId).subscribe(
      (result: boolean) => {
        if (result) {
          alert('Page activated successfully.');
          this.loadMeals();
        } else {
          alert('Failed to accept meal.');
        }
      },
      (error) => {
        alert('Error accepting meal');
      }
    );
  }
}
