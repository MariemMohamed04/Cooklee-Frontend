import { Component, OnInit } from '@angular/core';
import { Meal } from '../../models/meal';
import { MealService } from '../../_services/meal.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../../Core/header/header.component';

@Component({
  selector: 'app-meal-details',
  standalone: true,
  imports: [],
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.css'
})
export class MealDetailsComponent  {
  meal:Meal=new Meal(0,"Meal Name","This is a delicious meal description",false,true,0,"assets/meal.png");
}


// export class MealDetailsComponent implements OnInit {
//   meal:Meal=new Meal(0,"","",false,false,0,"");
//   constructor (public mealService:MealService,public activatedRoute:ActivatedRoute){}
//   ngOnInit(): void {
//     this.activatedRoute.params.subscribe(m=>{
//       this.mealService.getMealById(m['id']).subscribe(m=>{
//         this.meal=m;
//       })
//     })
//   }


// }
