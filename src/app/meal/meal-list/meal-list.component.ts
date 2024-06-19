// import { Component, OnInit } from '@angular/core';
// import { Meal } from '../../models/meal';
// import { MealService } from '../../services/meal.service';
// import { RouterLink } from '@angular/router';
// import { HeaderComponent } from '../../Core/header/header.component';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-meal-list',
//   standalone: true,
//   imports: [RouterLink, CommonModule], //CommonModule
//   templateUrl: './meal-list.component.html',
//   styleUrl: './meal-list.component.css',
// })
// export class MealListComponent implements OnInit {
//   meals: Meal[] = [
//     {
//       MealId: 0,
//       MealName: 'Meal Name',
//       MealDescription: 'This is a delicious meal description',
//       Healthy: false,
//       Availibility: false,
//       Price: 200,
//       Image: 'assets/meal.png',
//     },
//     {
//       MealId: 1,
//       MealName: 'Meal Name',
//       MealDescription: 'This is a delicious meal description',
//       Healthy: false,
//       Availibility: false,
//       Price: 0,
//       Image: 'assets/meal.png',
//     },
//     {
//       MealId: 3,
//       MealName: 'Meal Name',
//       MealDescription: 'This is a delicious meal description',
//       Healthy: false,
//       Availibility: false,
//       Price: 0,
//       Image: 'assets/meal.png',
//     },
//     {
//       MealId: 1,
//       MealName: 'Meal Name',
//       MealDescription: 'This is a delicious meal description',
//       Healthy: false,
//       Availibility: false,
//       Price: 0,
//       Image: 'assets/meal.png',
//     },
//   ];

//   constructor(public mealServices: MealService) {}
//   ngOnInit(): void {
//     // this.mealServices.getAllMeal().subscribe(data => {
//     //   console.log(data);
//     //   this.meals = data;
//     // })
//   }
// }
