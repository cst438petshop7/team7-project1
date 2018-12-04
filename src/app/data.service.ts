import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

class CartItem {
  itemName: string;
  amount: number;
  price: number;
}


export class DataService {
  constructor(private http: HttpClient) { }

  cartArray: Array<CartItem> = [];
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
          alert('data is not null username:' + data.valueOf()['username']['username']);
        }
      }
    );
  }

}
