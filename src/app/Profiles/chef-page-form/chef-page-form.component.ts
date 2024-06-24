import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../../models/client';
import { Chef, ChefPaymentMethod } from '../../models/chef';
import { AuthService } from '../../services/auth.service';
import { ChefPageService } from '../../services/chef-page.service';

@Component({
  selector: 'app-chef-page-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chef-page-form.component.html',
  styleUrl: './chef-page-form.component.css'
})
export class ChefPageFormComponent  implements OnInit{
 chef!:Chef
  id!:string
  paymentMethods = Object.values(ChefPaymentMethod)
  constructor(public router:Router,private authService:AuthService, private chefService:ChefPageService){
  }

  ngOnInit(): void {
    this.id = this.authService.getClaims().UserId
    this.chefService.getPageById(this.id).subscribe(
      data => this.chef = data,
      error => console.error('Error: ', error)
    );

  }

  UpdatePhoto(e:any){
    if(e.target.files){
   var reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload=(event:any)=>{
  this.chef.IdImgURL=event.target.result;

}}

}
 

  UpdatePage(){
    this.chefService.updatePage(this.id,this.chef).subscribe(
      data => this.router.navigateByUrl("/ChefPage"),
      error => console.error('Error: ', error)
    );
  
  }


}