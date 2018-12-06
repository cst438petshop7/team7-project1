import { FinalCart } from './../finalcart.component';
import { CartItem } from './../cartitem.component';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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



  getProducts() {
    return this.http.get('https://productsdb-service.herokuapp.com/allProducts');
  }

  getProductById(ID) {
    return this.http.get('https://productsdb-service.herokuapp.com/id/' + ID);
  }

  getUserByUsername(user, pass) {
    this.http.get('https://shopdb-service.herokuapp.com/username/' + user).subscribe(
      data => {
        if (data != null && data.valueOf()['password']['password'] === pass) {
          // console.log(data);
          // alert('successful sign in:' + data.valueOf()['username']['username']);
          this.userIn.setItem('key', data.valueOf()['username']['username']);
          this.userID.setItem('key2', data.valueOf()['id']);
          this.userCred.setItem('key3', data.valueOf()['credit']['credit']);
          this.router.navigateByUrl('/products');
        } else { alert('invalid username or password'); }
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
    console.log(this.cartArray);
    this.cartArray.forEach(element => {
      this.fin.id = element.id;
      this.fin.amount = element.amount;
      this.finalCart.push(this.fin);
    });

    console.log(JSON.stringify(this.finalCart));
    return this.http.put('https://finalize-order-service.herokuapp.com/finalize/' +
    this.userIn.getItem('key') + this.finalCart, JSON.stringify({}), {headers: putHeader});
  }
  getUserSess() {
    return this.userIn.getItem('key');
  }

}
