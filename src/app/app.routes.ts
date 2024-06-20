import { Routes } from '@angular/router';
import { ClientProfleFormComponent } from './Profiles/client-profile-form/client-profile-form.component';
import { ClientProfleComponent } from './Profiles/client-profile/client-profile.component';
import { ClientFavouriteComponent } from './Profiles/client-favourite/client-favourite.component';
import { ClientOrderComponent } from './Profiles/client-order/client-order.component';
import { ChefPageFormComponent } from './Profiles/chef-page-form/chef-page-form.component';
import { ChefPageComponent } from './Profiles/chef-page/chef-page.component';
import { ChefMealsComponent } from './Profiles/chef-meals/chef-meals.component';
import { RequestedMealsComponent } from './Profiles/requested-meals/requested-meals.component';
import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailsComponent } from './meal/meal-details/meal-details.component';
//import { NotfoundComponent } from './notfound/notfound.component';
import { LoginFormComponent } from './Registeration/login-form/login-form.component';
import { RegisterFormComponent } from './Registeration/register-form/register-form.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CartComponent } from './cart/cart.component';
import { SpecialMealComponent } from './SpecialMeal/special-meal/special-meal.component';
export const routes: Routes = [
  {
    path: 'ChefPage',
    component: ChefPageComponent,
    children: [
      { path: '', component: ChefMealsComponent },
      { path: 'chefMeals', component: ChefMealsComponent },
      { path: 'requestedMeals', component: RequestedMealsComponent },
    ],
  },

  // { path: "", redirectTo: "register", pathMatch: "full" },
  // { path: "register", component: RegisterFormComponent },
  // { path: "login", component: LoginFormComponent },
  // { path: 'ClientForm', component: ClientProfleFormComponent },
  // { path: "cart", component: CartComponent },
  // { path: "favorite", component: FavoriteComponent },
  // {
  //   path: 'ChefPage', component: ChefPageComponent, children: [

  //     { path: 'chefMeals', component: ChefMealsComponent },
  //     { path: 'requestedMeals', component: RequestedMealsComponent },
  //   ]
  // },
  { path: 'SpecialMeal', component: SpecialMealComponent },
  { path: 'meals', component: MealListComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];
