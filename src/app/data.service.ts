import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get('https://productsdb-service.herokuapp.com/allProducts');
  }
  getProductById(ID) {
    return this.http.get('https://productsdb-service.herokuapp.com/id/' + ID);
  }
  getUserByUsername(user) {
    alert('in data' + user);
    this.http.get('https://shopdb-service.herokuapp.com/username/' + user).subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
