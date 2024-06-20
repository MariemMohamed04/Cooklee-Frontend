import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { HomeMeal } from '../interfaces/home-meal';
import { MealService } from '../services/meal.service';


@Component({
    selector: 'app-home-meals',
    standalone: true,
     imports: [CommonModule],
    templateUrl: './home-meals.component.html',
    styleUrl: './home-meals.component.css'
})
export class HomeMealsComponent implements OnInit {

    meals: HomeMeal[] = [];
    constructor(private mealService: MealService) { }
    ngOnInit(): void {
        this.mealService.getMeals().subscribe((data: HomeMeal[]) => {
            this.meals = data;
            console.log(data);
        });
    }
    // slideConfig = {
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    // };
}


