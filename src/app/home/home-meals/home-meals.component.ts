import { MealService } from './../../services/meal.service';
import { Component, OnInit } from '@angular/core';
import { Meal } from '../../models/meal';
import { CommonModule } from '@angular/common';
import { MealDetailsComponent } from "../../meal/meal-details/meal-details.component";
import { HomeMealDetailsComponent } from "../home-meal-details/home-meal-details.component";
import { HomeMeal } from '../../interfaces/home-meal';


@Component({
    selector: 'app-home-meals',
    standalone: true,
    templateUrl: './home-meals.component.html',
    styleUrl: './home-meals.component.css',
    imports: [CommonModule, MealDetailsComponent, HomeMealDetailsComponent]
})
export class HomeMealsComponent implements OnInit {

    meals: HomeMeal[] = [];
    constructor(private mealService: MealService) { }
    ngOnInit(): void {
        // this.mealService.getAllMeal().subscribe((data: HomeMeal[]) => {
        //     this.meals = data;
        //     console.log(data);
        // });
    }

}


