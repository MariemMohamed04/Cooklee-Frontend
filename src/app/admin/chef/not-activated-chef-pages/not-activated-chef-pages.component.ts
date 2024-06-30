import { AdminChefService } from './../../../services/admin/admin-chef.service';
import { Chef } from './../../../models/chef';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    if (!this.feedbackText.trim()) {
      console.error('Feedback text is empty.');
      return;
    }

    this.adminChefService.sendFeedback(chefId, this.feedbackText).subscribe(
      (response) => {
        console.log('Feedback sent successfully:', response);
        // Optionally handle success feedback, clear fields, etc.
      },
      (error) => {
        console.error('Error sending feedback:', error);
        // Handle error feedback if needed
      }
    );
  }
}


  // sendFeedback(chefId:number): void {
  //   if (!this.feedbackText) {
  //     alert('Please enter feedback text.');
  //     return;
  //   }

  //   this.adminChefService.SendFeedback(chefId, this.feedbackText).subscribe(
  //     (response) => {
  //       console.log(response);
  //       alert('Feedback sent successfully.');
  //     },
  //     (error) => {
  //       console.error('Error sending feedback', error);
  //       alert('Failed to send feedback.');
  //     }
  //   );
  // }

  // sendFeedback(chefId: number): void {
  //   if (!this.feedbackText) {
  //     alert('Please enter feedback text.');
  //     return;
  //   }

  //   this.adminChefService.SendFeedback(chefId, this.feedbackText).subscribe(
  //     (response) => {
  //       console.log(response);
  //       alert('Feedback sent successfully.');
  //     },
  //     (error) => {
  //       console.error('Error sending feedback', error);
  //       alert('Failed to send feedback.');
  //     }
  //   );
  // }


  // submitFeedback(chefId: number, feedbackText: string) {
  //   if (!this.feedbackText) {
  //     alert('Please enter feedback text.');
  //     return;
  //   }
  //   this.adminChefService.sendFeedback(chefId, feedbackText).subscribe(
  //     response => {
  //       console.log('Feedback sent successfully:', response);
  //       // Handle success, e.g., show a success message
  //     },
  //     error => {
  //       console.error('Error sending feedback:', error);
  //       // Handle error, e.g., show an error message
  //     }
  //   );
  // }

  // submitFeedback(chefId: number, feedbackText: string) {
  //   if (!feedbackText.trim()) {
  //     alert('Please enter feedback text.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('chefId', chefId.toString());
  //   formData.append('feedback', feedbackText);

  //   this.adminChefService.sendFeedback(chefId, formData).subscribe(
  //     response => {
  //       console.log('Feedback sent successfully:', response);
  //       // Handle success, e.g., show a success message
  //     },
  //     error => {
  //       console.error('Error sending feedback:', error);
  //       // Handle error, e.g., show an error message
  //     }
  //   );
  // }

  // submitFeedback(chefId: number, feedbackText: string) {
  //   if (!feedbackText.trim()) {
  //     alert('Please enter feedback text.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('chefId', chefId.toString());
  //   formData.append('feedback', feedbackText);

  //   this.adminChefService.se(chefId, formData).subscribe(
  //     response => {
  //       console.log('Feedback sent successfully:', response);
  //       // Handle success, e.g., show a success message
  //     },
  //     error => {
  //       console.error('Error sending feedback:', error);
  //       // Handle error, e.g., show an error message
  //     }
  //   );
  // }

  // sendFeedback(): void {
  //   if (!this.feedbackText) {
  //     alert('Please enter feedback text.');
  //     return;
  //   }

  //   this.adminChefService.SendFeedback(chefId, this.feedbackText).subscribe(
  //     (response) => {
  //       console.log(response);
  //       alert('Feedback sent successfully.');
  //     },
  //     (error) => {
  //       console.error('Error sending feedback', error);
  //       alert('Failed to send feedback.');
  //     }
  //   );
  // }


