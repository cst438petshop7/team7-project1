import { CartItem } from './../../cartitem.component';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],

  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class ProductsPageComponent implements OnInit {

  products$: Object;
  addToCart: FormGroup;
  item: CartItem;
  b: boolean;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getProducts().subscribe(
      data => this.products$ = data
      );
      this.addToCart = new FormGroup({});
      console.log(JSON.parse(this.data.cart.getItem('cart')));
  }
  onClickMe(id, img, name, price, amount) {
    this.b = true;
    this.item = new CartItem();
    this.item.id = id;
    this.item.img = img;
    this.item.productName = name;
    this.item.price = price;
    this.item.amount = amount;

    this.data.cartArray.forEach(element => {
      if (element.id === id) {
        element.amount += amount;
        if (JSON.parse(this.data.cart.getItem('cart')) != null) {
          JSON.parse(this.data.cart.getItem('cart')).amount += amount;
        }
        this.b = false;
      }
    });

    if (this.b) {
      this.data.cartArray.push(this.item);
      if (JSON.parse(this.data.cart.getItem('cart')) != null) {
        JSON.parse(this.data.cart.getItem('cart')).push(this.item);
      }
      // this.data.cart.setItem('cart', JSON.stringify(this.data.cartArray));
      console.log(JSON.parse(this.data.cart.getItem('cart')));
    }

    console.log(this.data.cartArray);
  }
}
