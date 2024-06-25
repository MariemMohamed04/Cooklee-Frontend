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
import { FooterComponent } from '../../Core/footer/footer.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FooterComponent, FormsModule],
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css',
})
export class MealListComponent implements OnInit {
  meals: Meal[] = [];
  displayedMeals: Meal[] = [];
  searchTerm: string = '';
  currentPage = 1;
  itemsPerPage = 8;
  totalItems = 0;
  //filter by tag
  selectedTags: string[] = [];
  tags: string[] = [];
  //=====================
  constructor(
    public mealServices: MealService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchMeals();
    this.fetchMealsAndTags();
  }

  fetchMeals(): void {
    this.mealServices.getAll().subscribe((data) => {
      this.meals = data;
      this.totalItems = this.meals.length;
      this.updateDisplayedMeals();
      this.cdr.detectChanges();
    });
  }
  fetchMealsAndTags(): void {
    this.mealServices.getAll().subscribe((allData) => {
      this.meals = allData;
      this.tags = [...new Set(allData.flatMap((meal) => meal.tags))];
      this.updateDisplayedMeals();
    });
  }
  updateDisplayedMeals(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;

    // Filter meals based on search term
    let filteredMeals = this.meals.filter(
      (meal) =>
        meal.mealName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        this.searchTerm === ''
    );

    // Further filter meals based on selected tags
    if (this.selectedTags.length > 0) {
      filteredMeals = filteredMeals.filter((meal) =>
        this.selectedTags.every((tag) => meal.tags.includes(tag))
      );
    }

    this.displayedMeals = filteredMeals.slice(startIndex, endIndex);
  }

  // updateDisplayedMeals(): void {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = this.currentPage * this.itemsPerPage;
  //   this.displayedMeals = this.meals
  //     .filter(
  //       (meal) =>
  //         meal.mealName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  //         this.searchTerm === ''
  //     )
  //     .slice(startIndex, endIndex); // Apply filter based on search term
  // }

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

  onSearch(): void {
    this.updateDisplayedMeals(); // Update displayed meals based on search term
  }

  onReset(): void {
    this.searchTerm = ''; // Clear search term
    this.updateDisplayedMeals(); // Re-fetch all meals without filtering
  }
  onTagSelected(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.updateDisplayedMeals();
  }
}
