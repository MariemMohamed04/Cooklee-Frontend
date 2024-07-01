import { Component } from '@angular/core';
import { SpecialMeal } from '../../models/special-meal';
import { AuthService } from '../../services/auth.service';
import { SpecialMealService } from '../../services/special-meal.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chef-meals',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chef-meals.component.html',
  styleUrl: './chef-meals.component.css'
})
export class ChefMealsComponent {
  specialMeals!:SpecialMeal[]
  
  constructor(
    private authService:AuthService,
    private specialMealServices: SpecialMealService,
    private router:Router
  ){ 
  }


  ngOnInit(): void {
   let userId = this.authService.getClaims().UserId

   this.specialMealServices.getAllSpecialMeals().subscribe( 
    data =>{ this.specialMeals=data
    console.log(data)},
    
    error => console.error('Error fetching profile:', error)
   )

  }

  Delete(id:number){
    this.specialMealServices.deleteSpecialMeal(id).subscribe( 
      data =>{ 
      console.log(data)
    
      alert("meal Deleted Succussfully ")
      this.ngOnInit()},
      
      error => console.error('Error fetching profile:', error)
     )
  
  }

  update(id:number){
    this.router.navigate(['/Update', id]);


  }
}
