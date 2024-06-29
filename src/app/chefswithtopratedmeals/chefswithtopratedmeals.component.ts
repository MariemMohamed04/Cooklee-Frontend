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

  constructor(private chefsWithTopRatedMealsService: ChefsWithTopRatedMealsService) { }

  ngOnInit(): void {
    this.getAllChefsWithTopRatedMeals();
  }

  getAllChefsWithTopRatedMeals(): void {
    this.chefsWithTopRatedMealsService.getAllChefsWithTopRatedMeals().subscribe((data: ChefsWithTopRatedMealsDto[]) => {
      this.chefs = data;
      console.log(data); // Ensure data is logged correctly
      console.log(this.chefs); // Ensure data is logged correctly

    });
  }
}
