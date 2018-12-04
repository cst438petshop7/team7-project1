import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cst438Proj1';

}

class CartItem {
  itemName: string;
  amount: number;
  price: number;
  constructor() {
      this.itemName = '';
      this.amount = 0;
      this.price = 0;
  }

}

