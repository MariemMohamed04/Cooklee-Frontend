import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialMealService } from '../../services/special-meal.service';
import { SpecialMeal } from '../../models/special-meal';
import {  FormsModule } from '@angular/forms';
import { Chef } from '../../models/chef';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {


 
  spcialMeal!: SpecialMeal;



  constructor( private route:ActivatedRoute, private specialMealSercive:SpecialMealService,private authService: AuthService, private  router:Router){
    
  }

  ngOnInit(): void {
    const Id = this.route.snapshot.paramMap.get('id');
    if (Id !== null) {
      const numericId = parseInt(Id, 10); // Convert the string to a number
    
      if (!isNaN(numericId)) { // Ensure the conversion was successful
        this.specialMealSercive.getSpecialMealById(numericId).subscribe(
          data => {this.spcialMeal=data
            console.log(data)},
          error => console.error('Error fetching profile:', error)
        );
      } else {
        console.error('Invalid ID: could not convert to number');
      }
    } else {
      console.error('ID is null');
    }
}


onSubmit(): void {
 

  this.spcialMeal.userId= this.authService.getClaims().UserId;

  console.log("Form data being sent:",  this.spcialMeal);
  this.specialMealSercive.updateSpecialMeal( this.spcialMeal).subscribe(
    response => { 
      alert(`$Meal updated successfully${response}`);

      this.router.navigateByUrl('profile') 
    },
    error => {
      console.error('Error adding meal', error);
    }
  );
}

onDelete(){

}





}


    

