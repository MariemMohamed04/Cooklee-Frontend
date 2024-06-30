import { Component, OnInit } from '@angular/core';
import { ChefsWithTopRatedMealsService, ChefsWithTopRatedMealsDto } from '../services/chefs-with-top-rated-meals.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chefswithtopratedmeals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chefswithtopratedmeals.component.html',
  styleUrls: ['./chefswithtopratedmeals.component.css']
})
export class ChefswithtopratedmealsComponent implements OnInit {
  chefs: ChefsWithTopRatedMealsDto[] = [];
  isLoading = true;
  error = '';

  constructor(private chefsWithTopRatedMealsService: ChefsWithTopRatedMealsService) { }

  ngOnInit(): void {
    this.getAllChefsWithTopRatedMeals();
  }

  getAllChefsWithTopRatedMeals(): void {
    this.chefsWithTopRatedMealsService.getAllChefsWithTopRatedMeals().subscribe({
      next: (data: ChefsWithTopRatedMealsDto[]) => {
        this.chefs = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load chefs data';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
