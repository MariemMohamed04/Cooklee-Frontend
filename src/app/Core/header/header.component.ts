import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  clickTimeout: any;
  singleClickAction(): void {
    window.open('http://127.0.0.1:7860/', '_blank');
  }

  doubleClickAction(): void {
    window.open('http://127.0.0.1:7860/?__theme=dark', '_blank');
  }

  handleClick(): void {
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
      this.doubleClickAction();
    } else {
      this.clickTimeout = setTimeout(() => {
        this.singleClickAction();
        this.clickTimeout = null;
      }, 250); // Adjust the delay as needed
    }
  }
}
