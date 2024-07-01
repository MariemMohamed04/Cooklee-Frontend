import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpecialMealCardComponent } from '../special-meal-card/special-meal-card.component';
import { Chef } from '../../models/chef';
import { SpecialMeal } from '../../models/special-meal';
import { SpecialMealService } from '../../services/special-meal.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-special-meal-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SpecialMealCardComponent,
    FormsModule
  ],
  templateUrl: './special-meal-form.component.html',
  styleUrl: './special-meal-form.component.css'
})
export class SpecialMealFormComponent {
  mealForm: FormGroup;
  chefs: Chef[] = [];
  specialMeal!: SpecialMeal;
submittedMealName: any;
submittedDescription: any;
submittedMinPrice: any;
submittedMaxPrice: any;
submittedchef: any;//////
MealName: any;
  Description: any;
  MinPrice: any;
  MaxPrice: any;

  constructor(
    private fb: FormBuilder,
    private specialMealService: SpecialMealService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router :Router
    // Injecting ActivatedRoute to get route parameters
  ) {
    this.mealForm = this.fb.group({
      //id: [null], // Adding id to the form group
      s_MealName: [''],
      description: [''],
      minPrice: [0],
      maxPrice: [0],
      mealStatus: [null],
      clientId: [3],
      chefPageId: [0],
    });
  }

  onSubmit() {
    this.submittedMealName = this.MealName;
    this.submittedDescription = this.Description;
    this.submittedMinPrice = this.MinPrice;
    this.submittedMaxPrice = this.MaxPrice;
  }

  ngOnInit(): void {
    this.fetchChefs();
     this.loadSpecialMeal(); // Load the special meal if the id is present in the route
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

  loadSpecialMeal(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get the id from the route
    if (id) {
      this.specialMealService.getSpecialMealById(Number(id)).subscribe(
        data => {
          this.specialMeal = data;
          this.mealForm.patchValue(this.specialMeal); // Populate the form with the fetched data
        },
        error => {
          console.error('Error loading special meal', error);
        }
      );
    }
  }

  onSubmi(): void {
    const newMeal: SpecialMeal = this.mealForm.value;

    newMeal.userId= this.authService.getClaims().UserId;


    console.log("Form data being sent:", newMeal);
    this.specialMealService.addSpecialMeal(newMeal).subscribe(
      response => {

        this.specialMeal = response;
        alert('Meal added successfully');

        this.router.navigateByUrl('profile')
        
      },
      error => {
        console.error('Error adding meal', error);
      }
    );
  }


  onEdit(): void {
    if (this.specialMeal.id) {
      const updatedMeal: SpecialMeal = this.mealForm.value;
      updatedMeal.id = this.specialMeal.id;
      this.specialMealService.updateSpecialMeal(updatedMeal).subscribe(
        response => {
          console.log('Meal updated successfully', response);
          //this.router.navigate(['/special-meals']); // Navigate to the list or another page
        },
        error => {
          console.error('Error updating meal', error);
        }
      );
    } else {
      console.error('No id found for editing');
    }




    const meal = {
      id: 1, // قم بتعديل هذا إلى المعرف الحقيقي للوجبة
      MealName: this.MealName,
      Description: this.Description,
      MinPrice: this.MinPrice,
      MaxPrice: this.MaxPrice
    };

    this.specialMealService.updatecMeal(meal).subscribe({
      next: (data) => console.log('Update successful', data),
      error: (err) => console.error('Update failed', err),
      complete: () => console.log('Update request completed')
    });

  }
  onDelete(): void {
    console.log(this.specialMeal);

    const id = this.specialMeal.id; // Get the id from the form value
    if (id) {
      this.specialMealService.deleteSpecialMeal(id).subscribe(
        () => {
          console.log('Meal deleted successfully');
          // Optionally, reset the form or redirect to another page
          this.mealForm.reset();
        },
        error => {
          console.error('Error deleting meal', error);
        }
      );
    } else {
      console.error('No id found for deletion');
    }
  }
}
