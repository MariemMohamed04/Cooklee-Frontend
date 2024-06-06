import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../../models/client';

@Component({
  selector: 'app-chef-page-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chef-page-form.component.html',
  styleUrl: './chef-page-form.component.css'
})
export class ChefPageFormComponent {
  constructor(public router:Router){

  }
  client:Client=new Client("omnia","khalil","01010101010","omnia@gmail.com","angu/src/assets/website-maintenance.png","alex");
 PageName:string=  "defult"

  UpdatePage(){
    this.router.navigateByUrl("/ChefPage")
  }
}