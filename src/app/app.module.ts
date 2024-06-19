import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealDetailsComponent } from './meal/meal-details/meal-details.component';


const routes: Routes = [
  {
    path: 'meals/:id',
    component: MealDetailsComponent
  },
  // other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
