import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Client } from '../../models/client';

@Component({
  selector: 'app-chef-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet,RouterLinkActive],
  templateUrl: './chef-page.component.html',
  styleUrl: './chef-page.component.css'
})
export class ChefPageComponent {
  constructor(public router:Router){

  }
  client:Client=new Client("omnia","khalil","01010101010","omnia@gmail.com","angu/src/assets/website-maintenance.png","alex");

  Editpage(){
 this.router.navigateByUrl("/ChefPageForm")
  }

  BackToProfile(){
    this.router.navigateByUrl("/profile")
  }
}