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

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getProducts().subscribe(
      data => this.products$ = data
      );
      this.addToCart = new FormGroup({});
  }
  onClickMe(id, img, name, price, amount) {
    this.item = new CartItem();
    this.item.id = id;
    this.item.img = img;
    this.item.productName = name;
    this.item.price = price;
    this.item.amount = amount;
    if (this.data.cartArray.includes(this.item)) {
      this.data.cartArray.indexOf(this.item).valueOf()['amount']++;
    } else {this.data.cartArray.push(this.item); }

    console.log(this.data.cartArray);
  }
}
