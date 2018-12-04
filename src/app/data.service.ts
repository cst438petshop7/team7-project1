import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http: HttpClient, private nav: NavigationBarComponent) { }
  userIn = sessionStorage;
  // cartArray: Array<CartItem> = [];
  getProducts() {
    return this.http.get('https://productsdb-service.herokuapp.com/allProducts');
  }
  getProductById(ID) {
    return this.http.get('https://productsdb-service.herokuapp.com/id/' + ID);
  }
  getUserByUsername(user) {
    this.http.get('https://shopdb-service.herokuapp.com/username/' + user).subscribe(
      data => {
        if (data != null) {
          console.log(data);
          alert('username:' + data.valueOf()['username']['username']);
          this.userIn.setItem('key', data.valueOf()['username']['username']);
          // this.nav.changeUserName(this.userIn.getItem('key'));
        }
      }
    );
  }

}
