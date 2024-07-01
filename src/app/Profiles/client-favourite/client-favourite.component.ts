import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SpecialMealService } from '../../services/special-meal.service';
import { SpecialMeal } from '../../models/special-meal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-client-favourite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-favourite.component.html',
  styleUrl: './client-favourite.component.css'
})
export class ClientFavouriteComponent  implements OnInit{
  
  specialMeals!:SpecialMeal[]
  
  constructor(
    private authService:AuthService,
    private specialMealServices: SpecialMealService,
    private router:Router
  ){ 
  }


  ngOnInit(): void {
   let userId = this.authService.getClaims().UserId

   this.specialMealServices.getAllByClient(userId).subscribe( 
    data =>{ this.specialMeals=data
    console.log(data)},
    
    error => console.error('Error fetching profile:', error)
   )

  }

  Delete(id:number){
    this.specialMealServices.deleteSpecialMeal(id).subscribe( 
      data =>{ 
      console.log(data)
    
      alert("meal Deleted Succussfully ")
      this.ngOnInit()},
      
      error => console.error('Error fetching profile:', error)
     )
  
  }

  update(id:number){
    this.router.navigate(['/Update', id]);


  }

}
