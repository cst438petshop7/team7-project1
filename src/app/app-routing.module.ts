import { ThankyouPageComponent } from './thankyou-page/thankyou-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: SigninPageComponent
  },
  {
    path: 'products',
    component: ProductsPageComponent
  },
  {
    path: 'product-details/:id',
    component: DetailsPageComponent
  },
  {
    path: 'cart',
    component: CheckoutPageComponent
  },
  {
    path: 'thankyou',
    component: ThankyouPageComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
