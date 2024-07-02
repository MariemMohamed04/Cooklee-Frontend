import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  clickTimeout: any;
  Islogin=localStorage.getItem("token")==null ? false :true;
  singleClickAction(): void {
    window.open('http://127.0.0.1:7860/', '_blank');
  }
constructor(private router :Router , private authService :AuthService){}
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
  logout(){
localStorage.clear()

this.router.navigateByUrl("home")

  }
}