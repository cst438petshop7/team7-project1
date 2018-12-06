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

  constructor(private data: DataService) { }

  ngOnInit() {
    this.cartItems = JSON.parse(this.data.cart.getItem('cart'));
  }

}
