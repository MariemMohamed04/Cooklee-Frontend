import { Component } from '@angular/core';
import { SpecialMealCardComponent } from '../special-meal-card/special-meal-card.component';
import { SpecialMealFormComponent } from '../special-meal-form/special-meal-form.component';

@Component({
  selector: 'app-special-meal',
  standalone: true,
  imports: [
    SpecialMealCardComponent,
    SpecialMealFormComponent
  ],
  templateUrl: './special-meal.component.html',
  styleUrl: './special-meal.component.css'
})
export class SpecialMealComponent {

}
