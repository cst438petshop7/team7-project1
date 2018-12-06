import { Router } from '@angular/router';
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

  constructor(private router: Router, private data: DataService, private differs: KeyValueDiffers) { }
  cartItems: Array<CartItem> = [];
  total: number;
  formI: FormGroup;
  formB: FormGroup;
  modal: HTMLElement;


  //
  ngOnInit() {
    this.cartItems = JSON.parse(this.data.cart.getItem('cart'));
    this.total = 0;
    // this.cartItems.forEach(element => {
    //   this.total += this.product(element.amount, element.price);
    // });
    console.log(JSON.parse(this.data.cart.getItem('cart')));
    console.log(this.cartItems);
    this.formI = new FormGroup({
      amount: new FormControl('', Validators.required)
    });
    this.formB = new FormGroup({});
    this.modal = document.getElementById('myModal');
  }

  product(n1, n2) {
    return Number.parseFloat((n1 * n2).toFixed(2)) ;
  }
  totalPrice() {
    this.total = 0;
    this.cartItems.forEach(element => {
      this.total += this.product(element.amount, element.price);
    });
    return this.total.toFixed(2);
  }
  somethingChanged(id, amnt) {
    // alert(amnt);
    amnt = Number.parseFloat(amnt);
    this.cartItems.forEach(element => {
      if (element.id === id) {
        // alert('change worked');
        if (amnt <= 0) {
          alert('minimum in cart can only be 1 press remove to remove');
          element.amount = 1;
        } else { element.amount = amnt; }
      }
    });

    this.data.cart.setItem('cart', JSON.stringify(this.cartItems));
    console.log(JSON.parse(this.data.cart.getItem('cart')));
  }
  removeFromCart(id) {
    this.cartItems.forEach(element => {
      if (element.id === id) {
        const val = this.cartItems.indexOf(element);
        this.cartItems.splice(val, 1);
      }
    });

    this.data.cart.setItem('cart', JSON.stringify(this.cartItems));
    console.log(JSON.parse(this.data.cart.getItem('cart')));
  }
  showModal() {
    this.modal.style.display = 'block';
  }
  hideModal() {
    this.modal.style.display = 'none';
  }
  finalize() {
    this.data.finalizeOrder().subscribe(
      response => console.log(response),
      next => {
        this.router.navigateByUrl('/thankyou');
      }
    );
  }
}
