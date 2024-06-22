import { Component, OnInit } from '@angular/core';
import { HomeMeal, MealService } from '../../_services/meal.service';
import { Meal } from '../../models/meal';
import { CommonModule } from '@angular/common';
import { MealDetailsComponent } from "../../meal/meal-details/meal-details.component";
import { HomeMealDetailsComponent } from "../home-meal-details/home-meal-details.component";


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
        this.mealService.getAllMeal().subscribe((data: HomeMeal[]) => {
            this.meals = data;
            console.log(data);
        });
    }

}


