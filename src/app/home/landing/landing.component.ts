import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit, OnDestroy {
  images = [
    { src: '../../../assets/imgs/Meals/63a9b0025763641d88decbb1_popular-egyptian-foods.jpeg', title: 'Meal' },
    { src: '../../../assets/imgs/Meals/selection-of-egyptian-food-1024x682-1.jpg', title: 'Meal' },
    { src: '../../../assets/imgs/Meals/Top-Popular-and-Traditional-Egyptian-Food-you-Must-Try.jpeg', title: 'Meal' },
  ];

  selectedIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.showNext();
    }, 2000);
  }

  showPrev() {
    if (this.selectedIndex > 0) {
      this.selectedIndex -= 1;
    } else {
      this.selectedIndex = this.images.length - 1;
    }
  }

  showNext() {
    if (this.selectedIndex < this.images.length - 1) {
      this.selectedIndex += 1;
    } else {
      this.selectedIndex = 0;
    }
  }
}
