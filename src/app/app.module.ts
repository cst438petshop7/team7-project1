import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ThankyouPageComponent } from './thankyou-page/thankyou-page.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'sign-in',
    component: SigninPageComponent
  },
  {
    path: 'products',
    component: ProductsPageComponent
  },
  {
    path: 'product-details',
    component: DetailsPageComponent
  },
  {
    path: 'thank-you',
    component: ThankyouPageComponent
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent
  },
];

@NgModule({
  declarations: [

    AppComponent,
    DetailsPageComponent,
    HomePageComponent,
    SigninPageComponent,
    CheckoutPageComponent,
    ProductsPageComponent,
    ThankyouPageComponent,
    NavigationBarComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
