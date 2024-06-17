import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SpecialMeal } from '../../models/special-meal';
import { SpecialmealService } from '../../services/specialmeal.service';
import { CommonModule } from '@angular/common';
import { Chef } from '../../models/chef';

@Component({
  selector: 'app-special-meal-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './special-meal-form.component.html',
  styleUrl: './special-meal-form.component.css'
})
export class SpecialMealFormComponent implements OnInit {
  mealForm: FormGroup;
  chefs: Chef[] = [];

  constructor(private fb: FormBuilder, private specialMealService: SpecialmealService) {
    this.mealForm = this.fb.group({
      s_MealName: [''],
      description: [''],
      minPrice: [0],
      maxPrice: [0],
      mealStatus: [null],
      clientId: [0],
      chefPageId: [0],
    });
  }

  ngOnInit(): void {
    this.fetchChefs(); // Fetch chefs on component initialization
  }

  fetchChefs(): void {
    this.specialMealService.getAllChefs().subscribe(
      data => {
        this.chefs = data;
      },
      error => {
        console.error('Error fetching chefs', error);
      }
    );
  }

  onSubmit(): void {
    console.log("3");

    const newMeal: SpecialMeal = this.mealForm.value;
    console.log("4");

    this.specialMealService.addSpecialMeal(newMeal).subscribe(
      response => {
        console.log('Meal added successfully', response);
      },
      error => {
        console.error('Error adding meal', error);
      }
    );
  }
}
