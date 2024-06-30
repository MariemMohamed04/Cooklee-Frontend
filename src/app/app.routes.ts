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
import { LoginFormComponent } from './Registeration/login-form/login-form.component';
import { RegisterFormComponent } from './Registeration/register-form/register-form.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { PaymentComponent } from './checkout/payment/payment.component';
import { PaymentDoneComponent } from './checkout/payment-done/payment-done.component';
import { ResetPasswordComponent } from './Registeration/reset-password/reset-password.component';
import { HomeMealsComponent } from './home/home-meals/home-meals.component';
import { NewPasswordComponent } from './Registeration/new-password/new-password.component';
import { OrderStatusComponent } from './checkout/order-status/order-status.component';
import { OrderComponent } from './checkout/order/order.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { ActivatedCheffPagesComponent } from './admin/chef/activated-cheff-pages/activated-cheff-pages.component';
import { NotActivatedChefPagesComponent } from './admin/chef/not-activated-chef-pages/not-activated-chef-pages.component';
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
   { path: 'ChefPageForm', component: ChefPageFormComponent },

  // { path: 'ChefPage', redirectTo: 'ChefPage/chefMeals', pathMatch: 'full' },
  // {
  //   path: 'ChefPage', component: ChefPageComponent, children: [

  //     { path: '', component: ChefMealsComponent },
  //     { path: 'chefMeals', component: ChefMealsComponent },
  //     { path: 'requestedMeals', component: RequestedMealsComponent },
  //   ]
  // },

//   { path: "", redirectTo: "login", pathMatch: "full" },
//   { path: "login", component: LoginFormComponent },
//   { path: "register", component: RegisterFormComponent },
//   { path: "home", component: HomeMealsComponent },


//   {path: '', component:ChefMealsComponent},
//   {path: 'chefMeals', component:ChefMealsComponent},
//   {path: 'requestedMeals', component:RequestedMealsComponent},

// { path: 'Meals', component: MealListComponent },
// //  {path:'Meals/Details/:id',component:MealDetailsComponent,title:"Details of meal"}
// {path:'Meals/Details',component:MealDetailsComponent,title:"Details of meal"},
//   // {path:'**',component:NotfoundComponent} //component notfound

//   { path: 'ClientForm', component: ClientProfleFormComponent },
//   { path: 'profile', redirectTo: 'profile/Favourites', pathMatch: 'full' },


  // { path: "", redirectTo: "register", pathMatch: "full" },
  // { path: "register", component: RegisterFormComponent },
  // { path: "login", component: LoginFormComponent },
  // { path: 'ClientForm', component: ClientProfleFormComponent },
  { path: "", redirectTo: "admin", pathMatch: "full" },
  { path: "home", component: HomeMealsComponent },
  { path: "register", component: RegisterFormComponent },
  { path: "login", component: LoginFormComponent },
  { path: "reset", component: ResetPasswordComponent },
  { path: "repassword", component: NewPasswordComponent },
  { path: 'ClientForm', component: ClientProfleFormComponent },

  { path: 'Orders', component: ClientOrderComponent },
    {
    path: 'profile', component: ClientProfleComponent, children: [

      { path: '', component: ClientFavouriteComponent },
      { path: 'Favourites', component: ClientFavouriteComponent },
      { path: 'Orders', component: ClientOrderComponent },
    ]
  },

  {
    path: 'ChefPage', component: ChefPageComponent, children: [

      { path: '', component: ChefMealsComponent },
      { path: 'chefMeals', component: ChefMealsComponent },
      { path: 'requestedMeals', component: RequestedMealsComponent },
    ]
  },
  { path: "order", component: CheckoutComponent },
  { path: "Check-Order", component: OrderComponent },
  { path: "cart", component: CartComponent },
  { path: "favorite", component: FavoriteComponent },

  { path: "meals", component:MealListComponent },
  { path: "Payment", component:PaymentComponent },
  { path: "checkout", component:OrderStatusComponent},
  { path: "PaymentDone", component:PaymentDoneComponent},
  {
    path: 'Meals/Details/:id',
    component: MealDetailsComponent,
    title: 'Details of meal',
  },
  {
    path: 'admin', component: AdminLayoutComponent, children: [

      { path: '', component: ActivatedCheffPagesComponent },
      { path: 'active-chefs', component: ActivatedCheffPagesComponent },
      { path: 'inactive-chefs', component: NotActivatedChefPagesComponent },
    ]
  },
  { path:'**',component:NotfoundComponent }
]
