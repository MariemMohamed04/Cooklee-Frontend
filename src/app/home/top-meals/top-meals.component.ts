import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-meals',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './top-meals.component.html',
  styleUrl: './top-meals.component.css'
})
export class TopMealsComponent {

}
