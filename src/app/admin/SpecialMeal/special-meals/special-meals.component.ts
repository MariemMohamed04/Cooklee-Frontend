import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Feedback } from '../../../models/feedback';
import { AdminMealService } from '../../../services/admin/admin-meal.service';
import { Meal } from '../../../models/meal';
import { SpecialMealService } from '../../../services/special-meal.service';
import { SpecialMeal } from '../../../models/special-meal';

@Component({
  selector: 'app-special-meals',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './special-meals.component.html',
  styleUrl: './special-meals.component.css'
})
export class SpecialMealsComponent {
  specialMeals: SpecialMeal[] = [];
  feedbackText: string = '';
  declinedMap: { [key: number]: boolean } = {};

  constructor(
    private specialMealService: SpecialMealService
  ) {}

  ngOnInit(): void {
    this.loadMeals();
  }

  loadMeals(): void {
    this.specialMealService.getAllSpecialMeals().subscribe(
      (data) => {
        this.specialMeals = data;
        console.log('Meals loaded');
      },
      (error) => {
        console.error('Error loading meals', error);
      }
    );
  }

  acceptMeal(s_mealId: number): void {
    // this.specialMealService.(chefId, mealId).subscribe(
    //   (result: boolean) => {
    //     if (result) {
    //       alert('Meal accepted successfully.');
    //       this.loadMeals();
    //     } else {
    //       alert('Failed to accept meal.');
    //     }
    //   },
    //   (error) => {
    //     alert('Error accepting meal');
    //   }
    // );
  }

  declinePage(mealId: number): void {
    this.declinedMap[mealId] = true;
  }

  // sendFeedback(chefId: number, mealId: number): void {
  //   const feedback: Feedback = {
  //     body : this.feedbackText
  //   }
  //   this.adminMealService.SendFeedback(chefId, mealId, feedback).subscribe(
  //     (response) => {
  //       console.log(response);
  //       alert('Feedback sent successfully.');
  //     },
  //     (error) => {
  //       console.error('Error sending feedback', error);
  //       alert('Failed to send feedback.');
  //     }
  //   );
  // }

 
}
