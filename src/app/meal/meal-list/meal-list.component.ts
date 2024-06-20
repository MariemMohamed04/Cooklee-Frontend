// export class MealListComponent implements OnInit {
//   meals: Meal[] = [];
//   //pagination fields
//   currentPage = 1;
//   itemsPerPage = 8;
//   totalItems = this.meals.length;

//   constructor(
//     public mealServices: MealService,
//     private cdr: ChangeDetectorRef
//   ) {}
//   ngOnInit(): void {
//     this.mealServices.getAll().subscribe((data) => {
//       console.log(data);
//       this.meals = data;
//     });
//   }
//   //pagination method
//   get startIndex() {
//     return (this.currentPage - 1) * this.itemsPerPage;
//   }

//   get endIndex() {
//     return this.currentPage * this.itemsPerPage;
//   }
//   displayedMeals = this.meals.slice(this.startIndex, this.endIndex);
// }
// // this.mealServices.getAllMeals();
// //this.cdr.detectChanges();

// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { Meal } from '../../models/meal'; // Adjust the path according to your project structure
// import { MealService } from '../../_services/meal.service'; // Adjust the path according to your project structure
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-meal-list',
//   standalone: true,
//   templateUrl: './meal-list.component.html',
//   styleUrls: ['./meal-list.component.css'], // Note: use 'styleUrls' instead of 'styleUrl'
// })
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Meal } from '../../models/meal';
import { MealService } from '../../_services/meal.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../Core/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css',
})
export class MealListComponent implements OnInit {
  meals: Meal[] = [];
  displayedMeals: Meal[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  totalItems = 0;

  constructor(
    public mealServices: MealService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchMeals();
  }

  fetchMeals(): void {
    this.mealServices.getAll().subscribe((data) => {
      this.meals = data;
      this.totalItems = this.meals.length;
      this.updateDisplayedMeals();
      this.cdr.detectChanges();
    });
  }

  updateDisplayedMeals(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    this.displayedMeals = this.meals.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.totalItems / this.itemsPerPage)) {
      this.currentPage++;
      this.updateDisplayedMeals();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedMeals();
    }
  }
}
