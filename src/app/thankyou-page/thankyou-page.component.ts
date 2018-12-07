import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../cartitem.component';

@Component({
  selector: 'app-thankyou-page',
  templateUrl: './thankyou-page.component.html',
  styleUrls: ['./thankyou-page.component.scss']
})
export class ThankyouPageComponent implements OnInit {

  cartItems: Array<CartItem> = [];

  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.cartItems = JSON.parse(this.data.cart.getItem('cart'));
  }
  cancel() {
    this.data.cancelOrder().subscribe(
      response => console.log(response),
      next => {
        alert('order cancelled');
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem('cart');
        this.data.finalCart = [];
        this.data.cartArray = [];
        this.router.navigateByUrl('/products');
      }
    );
  }

  confirm() {
    alert('order confirmed');
    sessionStorage.removeItem('cart');
    sessionStorage.removeItem('cart');
    this.data.finalCart = [];
    this.data.cartArray = [];
    this.router.navigateByUrl('/products');
  }

}
