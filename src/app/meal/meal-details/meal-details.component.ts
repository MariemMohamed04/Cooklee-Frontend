import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Meal } from '../../models/meal';
import { MealService } from '../../services/meal.service';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meal-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,RouterLinkActive, RouterOutlet],
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.css'
})

export class MealDetailsComponent implements OnInit {
  meal: Meal = new Meal(0, "", "", false, false, 0, "", 0.0, []);
  constructor(
    private mealService: MealService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = +params['id'];
      this.mealService.getMealById(id).subscribe(data => {
        this.meal = data;
        this.cdr.detectChanges(); // Manually trigger change detection
        console.log(this.meal);
      });
    });
  }
}
// export class MealDetailsComponent implements OnInit {
//   meal:Meal=new Meal(0,"","",false,false,0,"");
//   // reviews: Review[] = [];
//   // newReview: Review = {
//   //   id: 0,
//   //   comment: '',
//   //   rate: 0,
//   //   clientId: 1, // Example client ID, replace with actual user ID
//   //   mealId: this.meal.MealId
//   // };
//   constructor (public mealService:MealService,public activatedRoute:ActivatedRoute){}
//   ngOnInit(): void {
//     this.activatedRoute.params.subscribe(m=>{
//       this.mealService.getMealById(m['id']).subscribe(m=>{
//         this.meal=m;
//       })
//     })
//     // this.loadReviews();
//   }
//   // loadReviews(): void {
//   //   this.mealService.getAllReviews().subscribe(
//   //     (reviews: Review[]) => {
//   //       this.reviews = reviews;
//   //     },
//   //     (error) => {
//   //       console.log('Error loading reviews:', error);
//   //     }
//   //   );
//   // }
//   // submitReview(): void {
//   //   this.mealService.postReview(this.newReview).subscribe(
//   //     (response) => {
//   //       console.log('Review submitted successfully:', response);
//   //       this.loadReviews(); // Refresh reviews after submission
//   //       this.newReview = {
//   //         id: 0,
//   //         comment: '',
//   //         rate: 0,
//   //         clientId: 1, // Reset client ID for next review (example)
//   //         mealId: this.meal.MealId
//   //       };
//   //     },
//   //     (error) => {
//   //       console.log('Error submitting review:', error);
//   //     }
//   //   );

// // }
// }
