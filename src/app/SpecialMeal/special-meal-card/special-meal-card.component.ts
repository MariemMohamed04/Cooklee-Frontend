import { Component, Input } from '@angular/core';
import { SpecialMealService } from '../../services/special-meal.service';
import { SpecialMeal } from '../../models/special-meal';

@Component({
  selector: 'app-special-meal-card',
  standalone: true,
  imports: [],
  templateUrl: './special-meal-card.component.html',
  styleUrl: './special-meal-card.component.css'
})
export class SpecialMealCardComponent {
//   @Input() MealName: string = "";
//   @Input() Description: string = '';
//   @Input() MinPrice: number = 0;
//   @Input() MaxPrice: number = 0;
//  // @Input()  chefs: Chef[] = [];;
//   constructor( private specialMealService: SpecialMealService,) {}

@Input() specialMeal!: SpecialMeal;
}
