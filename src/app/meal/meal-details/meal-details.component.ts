import { Component, OnInit } from '@angular/core';
import { Meal } from '../../models/meal';
import { MealService } from '../../_services/meal.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Review } from '../../models/review';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meal-details',
  standalone: true,
  imports: [  BrowserModule,FormsModule],
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.css'
})
// export class MealDetailsComponent  {
//   meal:Meal=new Meal(0,"Meal Name","This is a delicious meal description",false,true,0,"assets/meal.png");
// }


export class MealDetailsComponent implements OnInit {
  meal:Meal=new Meal(0,"","",false,false,0,"");
  reviews: Review[] = [];
  newReview: Review = {
    id: 0,
    comment: '',
    rate: 0,
    clientId: 1, // Example client ID, replace with actual user ID
    mealId: this.meal.MealId
  };
  constructor (public mealService:MealService,public activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(m=>{
      this.mealService.getMealById(m['id']).subscribe(m=>{
        this.meal=m;
      })
    })
    this.loadReviews();
  }
  loadReviews(): void {
    this.mealService.getAllReviews().subscribe(
      (reviews: Review[]) => {
        this.reviews = reviews;
      },
      (error) => {
        console.log('Error loading reviews:', error);
      }
    );
  }
  submitReview(): void {
    this.mealService.postReview(this.newReview).subscribe(
      (response) => {
        console.log('Review submitted successfully:', response);
        this.loadReviews(); // Refresh reviews after submission
        this.newReview = {
          id: 0,
          comment: '',
          rate: 0,
          clientId: 1, // Reset client ID for next review (example)
          mealId: this.meal.MealId
        };
      },
      (error) => {
        console.log('Error submitting review:', error);
      }
    );

}
}
