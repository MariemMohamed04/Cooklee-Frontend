import { Component } from '@angular/core';
import { SpecialMealFormComponent } from '../special-meal-form/special-meal-form.component';
import { SpecialMealCardComponent } from '../special-meal-card/special-meal-card.component';

@Component({
  selector: 'app-special-meal',
  standalone: true,
  imports: [
    SpecialMealFormComponent,
    SpecialMealCardComponent
  ],
  templateUrl: './special-meal.component.html',
  styleUrl: './special-meal.component.css'
})
export class SpecialMealComponent {

}
