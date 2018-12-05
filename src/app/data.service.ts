import { CartItem } from './../cartitem.component';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http: HttpClient, private router: Router) { }
  userIn = sessionStorage;
  cartArray: Array<CartItem> = [];
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
          this.router.navigateByUrl('/products');
        } else { alert('invalid username or password'); }
      }
    );
  }
  changeNavUser() {
    return this.userIn.getItem('key');
  }

}
