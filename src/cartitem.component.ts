
export class CartItem {
  productName: string;
  amount: number;
  price: number;
  img: string;

  CartItem() {
    this.productName = undefined;
    this.amount = undefined;
    this.price = undefined;
    this.img = undefined;
  }
}
