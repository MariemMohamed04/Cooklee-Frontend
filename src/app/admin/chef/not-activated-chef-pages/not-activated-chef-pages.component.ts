import { AdminChefService } from './../../../services/admin/admin-chef.service';
import { Chef } from './../../../models/chef';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Feedback } from '../../../models/feedback';

@Component({
  selector: 'app-not-activated-chef-pages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './not-activated-chef-pages.component.html',
  styleUrl: './not-activated-chef-pages.component.css'
})
export class NotActivatedChefPagesComponent implements OnInit {
  chefs: Chef[] = [];
  feedbackText: string = '';
  declinedMap: { [key: number]: boolean } = {};

  constructor(private adminChefService: AdminChefService) {}

  ngOnInit(): void {
    this.loadChefs();
  }

  loadChefs(): void {
    this.adminChefService.GetUnActivePages().subscribe(
      (data: Chef[]) => {
        this.chefs = data;
        console.log('Chefs loaded:', this.chefs);
      },
      (error) => {
        console.error('Error loading chefs', error);
      }
    );
  }

  activatePage(chefId: number): void {
    this.adminChefService.ActivatePage(chefId).subscribe(
      (result: boolean) => {
        if (result) {
          console.log('Page activated successfully.');
          this.loadChefs();
        } else {
          console.error('Failed to activate page.');
        }
      },
      (error) => {
        console.error('Error activating page', error);
      }
    );
  }

  declinePage(chefId: number): void {
    this.declinedMap[chefId] = true;
  }

  sendFeedback(chefId: number): void {
    const feedback: Feedback = {
      body : this.feedbackText
    }
    this.adminChefService.SendFeedback(chefId, feedback).subscribe(
      (response) => {
        console.log(response);
        alert('Feedback sent successfully.');
      },
      (error) => {
        console.error('Error sending feedback', error);
        alert('Failed to send feedback.');
      }
    );
  }
}
