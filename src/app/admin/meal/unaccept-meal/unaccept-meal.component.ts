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
        console.log('Meals loaded');
      },
      (error) => {
        console.error('Error loading meals', error);
      }
    );
  }

  acceptMeal(chefId: number, mealId: number): void {
    this.adminMealService.AcceptMeal(chefId, mealId).subscribe(
      (result: boolean) => {
        if (result) {
          alert('Meal accepted successfully.');
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
