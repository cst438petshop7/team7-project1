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
          console.log(data);
          // alert('successful sign in:' + data.valueOf()['username']['username']);
          this.userIn.setItem('key', data.valueOf()['username']['username']);
          this.userID.setItem('key', data.valueOf()['id']);
          this.userCred.setItem('key', data.valueOf()['credit']['credit']);
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
    this.http.put('https://finalize-order-service.herokuapp.com/finalize/' +
    this.userIn.getItem('key') +
    '/' +
    JSON.stringify(this.cart.getItem('cart')),
    {headers: putHeader});
    sessionStorage.clear();
    this.router.navigateByUrl('/');
    return;
  }

}
