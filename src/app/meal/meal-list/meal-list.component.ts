// Start: Import Statements
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { Meal } from '../../models/meal';
import { MealService } from '../../_services/meal.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../Core/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../Core/footer/footer.component';
import { FormsModule } from '@angular/forms';

// End: Import Statements

@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FooterComponent, FormsModule],
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css'],
})
export class MealListComponent implements OnInit {
  // Start: Properties Section
  meals: Meal[] = [];
  displayedMeals: Meal[] = [];
  searchTerm: string = '';
  selectedTags: string[] = [];
  tags: string[] = [];
  selectedSortCriterion: string = '';
  selectedSortDirection: 'asc' | 'desc' = 'asc';
  selectedSortDirectionEnabled: boolean = false;
  currentPage: number = 1;
  itemsPerPage = 8;
  totalItems = 0;
  windowWidth!: number;
  // End: Properties Section

  // Start: Constructor and Initial Setup
  constructor(
    public mealServices: MealService,
    private cdr: ChangeDetectorRef,
    private el: ElementRef
  ) {
    this.detectScreenSize();
  }

  ngOnInit(): void {
    this.fetchMeals();
    this.fetchMealsAndTags();
  }
  // End: Constructor and Initial Setup

  // Start: Fetching Data Methods
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
  // End: Fetching Data Methods

  // Start: Screen Size Detection
  detectScreenSize(): void {
    this.windowWidth =
      this.el.nativeElement.ownerDocument.defaultView.innerWidth;
    this.setItemsPerPageBasedOnWindowWidth();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.windowWidth =
      this.el.nativeElement.ownerDocument.defaultView.innerWidth;
    this.setItemsPerPageBasedOnWindowWidth();
  }

  setItemsPerPageBasedOnWindowWidth(): void {
    if (this.windowWidth >= 1200) {
      this.itemsPerPage = 8;
    } else if (this.windowWidth >= 768) {
      this.itemsPerPage = 4;
    } else {
      this.itemsPerPage = 3;
    }
  }
  // End: Screen Size Detection

  // Start: Display Logic
  updateDisplayedMeals(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    let filteredMeals = this.meals.filter(
      (meal) =>
        meal.mealName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        this.searchTerm === ''
    );

    if (this.selectedTags.length > 0) {
      filteredMeals = filteredMeals.filter((meal) =>
        this.selectedTags.every((tag) => meal.tags.includes(tag))
      );
    }

    this.displayedMeals = filteredMeals.slice(startIndex, endIndex);
    this.totalItems = filteredMeals.length;
  }
  // End: Display Logic

  // Start: Navigation Methods
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
    this.updateDisplayedMeals();
  }

  onReset(): void {
    this.searchTerm = '';
    this.updateDisplayedMeals();
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
  // End: Navigation Methods

  // Start: Sorting Methods
  sortMeals(sortBy: string, direction: 'asc' | 'desc'): void {
    if (sortBy === 'price') {
      this.meals.sort((a, b) => {
        if (direction === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    } else if (sortBy === 'name') {
      this.meals.sort((a, b) => {
        if (direction === 'asc') {
          return String(a.mealName).localeCompare(String(b.mealName));
        } else {
          return String(b.mealName).localeCompare(String(a.mealName));
        }
      });
    }
    this.updateDisplayedMeals();
  }

  updateSortOptions(): void {
    this.selectedSortDirectionEnabled =
      this.selectedSortCriterion !== '' &&
      this.selectedSortCriterion !== undefined;
  }
  // End: Sorting Methods

  // Start: Pagination Helpers
  get startIndex() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex() {
    return this.currentPage * this.itemsPerPage;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedMeals();
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  // End: Pagination Helpers
}
