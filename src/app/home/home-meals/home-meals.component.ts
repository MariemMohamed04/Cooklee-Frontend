import { MealService } from './../../services/meal.service';
import { Component, OnInit } from '@angular/core';
import { Meal } from '../../models/meal';
import { CommonModule } from '@angular/common';
import { MealDetailsComponent } from "../../meal/meal-details/meal-details.component";
import { HomeMealDetailsComponent } from "../home-meal-details/home-meal-details.component";
import { HomeMeal } from '../../interfaces/home-meal';
import { LandingComponent } from '../landing/landing.component';
import { TopMealsComponent } from '../top-meals/top-meals.component';
import { TopChefsComponent } from '../top-chefs/top-chefs.component';


@Component({
    selector: 'app-home-meals',
    standalone: true,
    templateUrl: './home-meals.component.html',
    styleUrl: './home-meals.component.css',
    imports:
    [
      CommonModule,
      MealDetailsComponent,
      HomeMealDetailsComponent,
      LandingComponent,
      TopMealsComponent,
      TopChefsComponent
    ]
})
export class HomeMealsComponent {

}


