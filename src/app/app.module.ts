import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ThankyouPageComponent } from './thankyou-page/thankyou-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsPageComponent,
    HomePageComponent,
    SigninPageComponent,
    CheckoutPageComponent,
    ProductsPageComponent,
    ThankyouPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
