import { RouterModule, Routes } from '@angular/router';
import { ClientProfleFormComponent } from './Profiles/client-profile-form/client-profile-form.component';
import { ClientProfleComponent } from './Profiles/client-profile/client-profile.component';
import { ClientFavouriteComponent } from './Profiles/client-favourite/client-favourite.component';
import { ClientOrderComponent } from './Profiles/client-order/client-order.component';
import { ChefPageFormComponent } from './Profiles/chef-page-form/chef-page-form.component';
import { ChefPageComponent } from './Profiles/chef-page/chef-page.component';
import { ChefMealsComponent } from './Profiles/chef-meals/chef-meals.component';
import { RequestedMealsComponent } from './Profiles/requested-meals/requested-meals.component';
//import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailsComponent } from './meal/meal-details/meal-details.component';
//import { NotfoundComponent } from './notfound/notfound.component';
import { LoginFormComponent } from './Registeration/login-form/login-form.component';
import { RegisterFormComponent } from './Registeration/register-form/register-form.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
export const routes: Routes = [


  // { path: '', redirectTo: 'ClientForm', pathMatch: 'full' },
  // { path: 'ClientForm', component: ClientProfleFormComponent },

  // { path: 'profile', redirectTo: 'profile/Favourites', pathMatch: 'full' },
  // {
  //   path: 'profile', component: ClientProfleComponent, children: [

  //     { path: '', component: ClientFavouriteComponent },
  //     { path: 'Favourites', component: ClientFavouriteComponent },
  //     { path: 'Orders', component: ClientOrderComponent },
  //   ]
  // },
  // { path: 'ChefPageForm', component: ChefPageFormComponent },

  // { path: 'ChefPage', redirectTo: 'ChefPage/chefMeals', pathMatch: 'full' },
  // {
  //   path: 'ChefPage', component: ChefPageComponent, children: [

  //     { path: '', component: ChefMealsComponent },
  //     { path: 'chefMeals', component: ChefMealsComponent },
  //     { path: 'requestedMeals', component: RequestedMealsComponent },
  //   ]
  // },

  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginFormComponent },
  { path: "register", component: RegisterFormComponent },
  {path: 'chefMeals', component:ChefMealsComponent},
  {path: 'requestedMeals', component:RequestedMealsComponent},
//{ path: 'Meals', component: MealListComponent },
 {path:'Meals/Details/:id',component:MealDetailsComponent,title:"Details of meal"},

//  {path:'Meals/Details/:id',component:MealDetailComponent,title:"Details of meal"},
// {path:'Meals/Details',component:MealDetailsComponent,title:"Details of meal"},
  // {path:'**',component:NotfoundComponent} //component notfound

  { path: 'ClientForm', component: ClientProfleFormComponent },
  { path: 'profile', redirectTo: 'profile/Favourites', pathMatch: 'full' },

  {
    path: 'ChefPage', component: ChefPageComponent, children: [

      { path: '', component: ChefMealsComponent },
      { path: 'chefMeals', component: ChefMealsComponent },
      { path: 'requestedMeals', component: RequestedMealsComponent },
    ]
  },

  // { path: "", redirectTo: "register", pathMatch: "full" },
  // { path: "register", component: RegisterFormComponent },
  // { path: "login", component: LoginFormComponent },
  // { path: 'ClientForm', component: ClientProfleFormComponent },
  { path: "", redirectTo: "checkout", pathMatch: "full" },
  { path: "checkout", component: CheckoutComponent },
  { path: "cart", component: CartComponent },
  { path: "favorite", component: FavoriteComponent },
  {
    path: 'ChefPage', component: ChefPageComponent, children: [

      { path: '', component: ChefMealsComponent },
      { path: 'chefMeals', component: ChefMealsComponent },
      { path: 'requestedMeals', component: RequestedMealsComponent },
    ]
  },
  {path:'**',component:NotfoundComponent}

]

