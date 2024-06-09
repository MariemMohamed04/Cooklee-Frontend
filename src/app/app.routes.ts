import { Routes } from '@angular/router';
import { ClientProfleFormComponent } from './Profiles/client-profile-form/client-profile-form.component';
import { ClientProfleComponent } from './Profiles/client-profile/client-profile.component';
import { ClientFavouriteComponent } from './Profiles/client-favourite/client-favourite.component';
import { ClientOrderComponent } from './Profiles/client-order/client-order.component';
import { ChefPageFormComponent } from './Profiles/chef-page-form/chef-page-form.component';
import { ChefPageComponent } from './Profiles/chef-page/chef-page.component';
import { ChefMealsComponent } from './Profiles/chef-meals/chef-meals.component';
import { RequestedMealsComponent } from './Profiles/requested-meals/requested-meals.component';
import { LoginFormComponent } from './Registeration/login-form/login-form.component';
import { RegisterFormComponent } from './Registeration/register-form/register-form.component';

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

  { path: "", redirectTo: "register", pathMatch: "full" },
  { path: "register", component: RegisterFormComponent },
  { path: "login", component: LoginFormComponent },

];
