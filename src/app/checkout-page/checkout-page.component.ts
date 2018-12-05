import { CartItem } from './../../cartitem.component';
import { Component, OnInit } from '@angular/core';
import { DoCheck, KeyValueDiffers, KeyValueDiffer } from '@angular/core';
import { HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],

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
export class CheckoutPageComponent implements OnInit {

  constructor(private data: DataService, private differs: KeyValueDiffers) { }
  cartItems: Array<CartItem> = [];
  total: number;
  event = document.getElementById('scroller');
  dif: KeyValueDiffer<string, HTMLElement>;

  //
  ngOnInit() {
    this.cartItems = JSON.parse(this.data.cart.getItem('cart'));
    this.total = 0;
    this.cartItems.forEach(element => {
      this.total += this.product(element.amount, element.price);
    });

  }

  // ngDoCheck() {
  //   const change = this.dif.diff(this);
  //   if (change) {
  //     change.forEachChangedItem(item => {
  //       console.log('item changed', item);
  //     });
  //   }
  // }

  product(n1, n2) {
    return Number.parseFloat((n1 * n2).toPrecision(2)) ;
  }
  totalPrice() {
    return this.total;
  }
  somethingChanged(cartitem, amount) {
    alert('change worked');
    cartitem.amount = amount;
  }

}
