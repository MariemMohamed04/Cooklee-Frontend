import { Component, Input } from '@angular/core';
import { HomeMeal } from '../../_services/meal.service';

@Component({
  selector: 'app-home-meal-details',
  standalone: true,
  imports: [],
  templateUrl: './home-meal-details.component.html',
  styleUrl: './home-meal-details.component.css'
})
export class HomeMealDetailsComponent {
  @Input() homeMeal !:HomeMeal;
}
