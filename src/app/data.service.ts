import { Pass } from './../pass.component';
import { FinalCart } from './../finalcart.component';
import { CartItem } from './../cartitem.component';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/user.component';
import { OutsideUser } from 'src/outsideuser.component';


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
  signinpass: Pass;
  outUser: OutsideUser;



  getProducts() {
    // https://productsdb-service.herokuapp.com/allProducts
    return this.http.get('https://get-products-service.herokuapp.com/Products');
  }

  getProductById(ID) {
    return this.http.get('https://get-products-service.herokuapp.com/id/' + ID);
  }

  getUserByUsername(user, pass) {
    this.signinuser = new User();
    this.signinuser.username = user;
    this.signinpass = new Pass();
    this.signinpass.password = pass;
    this.outUser = new OutsideUser();
    this.outUser.username = this.signinuser;
    this.outUser.password = this.signinpass;
    // alert(JSON.stringify(this.outUser));

    const putHeader = new HttpHeaders().append('Content-Type' , 'application/json');
    putHeader.append('Access-Control-Allow-Origin', '*');
    putHeader.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    putHeader.append('Access-Control-Allow-Credentials', 'true');
    putHeader.append('Accept', 'application/json');

    const url = 'https://get-user-service.herokuapp.com/login';

    this.http.post(url, this.outUser, {headers: putHeader}).subscribe(
      data => {
        if (data != null && data.valueOf()['password']['password'] === pass) {
          // console.log(data);
          // alert('successful sign in:' + data.valueOf()['username']['username']);
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
