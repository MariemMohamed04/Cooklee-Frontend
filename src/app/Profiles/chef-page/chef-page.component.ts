import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Client } from '../../models/client';
import { Chef } from '../../models/chef';
import { AuthService } from '../../services/auth.service';
import { ChefPageService } from '../../services/chef-page.service';

@Component({
  selector: 'app-chef-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet,RouterLinkActive],
  templateUrl: './chef-page.component.html',
  styleUrl: './chef-page.component.css'
})
export class ChefPageComponent implements OnInit {

  chef!:Chef
  id!:string
  constructor(public router:Router,private authService:AuthService, private chefService:ChefPageService){
    
  }


  ngOnInit(): void {
    this.id = this.authService.getClaims().UserId
    this.chefService.getPage(this.id).subscribe(
      data => this.chef = data,
      error => console.error('Error: ', error)
    );
  }

  Editpage(){
 this.router.navigateByUrl("/ChefPageForm")
  }

  BackToProfile(){
    this.router.navigateByUrl("/profile")
  }
}