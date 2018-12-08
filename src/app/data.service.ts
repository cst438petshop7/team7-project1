import { FinalCart } from './../finalcart.component';
import { CartItem } from './../cartitem.component';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/user.component';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http: HttpClient, private router: Router) { }
  userIn = sessionStorage;
  userID = sessionStorage;
  userCred = sessionStorage;
  cart = sessionStorage;
  cartArray: Array<CartItem> = [];
  finalCart: Array<FinalCart> = [];
  fin: FinalCart;
  signedIn = false;
  putHeader: HttpHeaders;
  signinuser: User;



  getProducts() {
    // https://productsdb-service.herokuapp.com/allProducts
    return this.http.get('https://get-products-service.herokuapp.com/Products');
  }

  getProductById(ID) {
    return this.http.get('https://get-products-service.herokuapp.com/id/' + ID);
  }

  getUserByUsername(user, pass) {
    this.http.get('https://shopdb-service.herokuapp.com/username/' + user).subscribe(
      data => {
        if (data != null && data.valueOf()['password']['password'] === pass) {
          // console.log(data);
          // alert('successful sign in:' + data.valueOf()['username']['username']);
          this.signinuser = new User();
          this.signinuser.username = user;
          this.signinuser.password = pass;
          JSON.stringify(this.signinuser);
          this.userIn.setItem('key', data.valueOf()['username']['username']);
          this.userID.setItem('key2', data.valueOf()['id']);
          this.userCred.setItem('key3', data.valueOf()['credit']['credit']);
          this.router.navigateByUrl('/products');
        } else {
          alert('invalid username or password');
        }
      }
    );
  }

  changeNavUser() {
    return this.userIn.getItem('key');
  }

  finalizeOrder() {
    const putHeader = new HttpHeaders().append('Content-Type' , 'application/json');
    putHeader.append('Access-Control-Allow-Origin', '*');
    putHeader.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    putHeader.append('Access-Control-Allow-Credentials', 'true');
    putHeader.append('Accept', 'application/json');
    this.fin = new FinalCart();
    this.cartArray = JSON.parse(this.cart.getItem('cart'));
    this.finalCart = [];
    console.log(this.cartArray);
    this.cartArray.forEach(element => {
      this.fin.id = element.id;
      this.fin.amount = element.amount;
      this.finalCart.push(this.fin);
      this.fin = new FinalCart();
    });
    console.log(this.finalCart);
    console.log(JSON.stringify(this.finalCart));
    const url = 'https://finalize-order-service.herokuapp.com/finalize/' + this.userIn.getItem('key');
    console.log(url);
    this.cartArray = [];
    return this.http.post(url, this.finalCart, {headers: putHeader});

  }

  cancelOrder() {
    const putHeader = new HttpHeaders().append('Content-Type' , 'application/json');
    putHeader.append('Access-Control-Allow-Origin', '*');
    putHeader.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    putHeader.append('Access-Control-Allow-Credentials', 'true');
    putHeader.append('Accept', 'application/json');
    this.fin = new FinalCart();
    this.cartArray = JSON.parse(this.cart.getItem('cart'));
    this.finalCart = [];
    console.log(this.cartArray);
    this.cartArray.forEach(element => {
      this.fin.id = element.id;
      this.fin.amount = element.amount;
      this.finalCart.push(this.fin);
    });


    console.log(JSON.stringify(this.finalCart));
    const url = 'https://finalize-order-service.herokuapp.com/reverse/' + this.userIn.getItem('key');
    console.log(url);
    this.cartArray = [];
    return this.http.post(url, this.finalCart, {headers: putHeader});
  }

  getUserSess() {
    return this.userIn.getItem('key');
  }

}
