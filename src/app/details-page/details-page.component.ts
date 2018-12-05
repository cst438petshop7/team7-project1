import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { CartItem } from './../../cartitem.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  product$: Object;
  addToCart: FormGroup;
  item: CartItem;
  b: boolean;
  cartCopy: Array<CartItem> = [];

  constructor(private route: ActivatedRoute, private data: DataService) {
     this.route.params.subscribe( params => this.product$ = params.id );
  }

  ngOnInit() {
    this.data.getProductById(this.product$).subscribe(
      data => this.product$ = data
    );
    this.addToCart = new FormGroup({
      amount: new FormControl('', Validators.required)
    });
  }
  onClickMe(id, img, name, price) {
    this.b = true;
    this.item = new CartItem();
    this.item.id = id;
    this.item.img = img;
    this.item.productName = name;
    this.item.price = price;
    this.item.amount = this.addToCart.value.amount;

    if (JSON.parse(this.data.cart.getItem('cart')) != null) {
      this.data.cartArray  = JSON.parse(this.data.cart.getItem('cart'));
    }

      this.data.cartArray.forEach(element => {
        if (element.id === id) {
          element.amount += this.addToCart.value.amount;
          this.b = false;
        }
      });

    if (this.b) {
      this.data.cartArray.push(this.item);
    }
    this.data.cart.setItem('cart', JSON.stringify(this.data.cartArray));
    console.log(JSON.parse(this.data.cart.getItem('cart')));
  }

}
