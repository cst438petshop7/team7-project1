
export class CartItem {
  id: string;
  productName: string;
  amount: number;
  price: number;
  img: string;
  stock: number;

  CartItem() {
    this.id = undefined;
    this.productName = undefined;
    this.amount = undefined;
    this.price = undefined;
    this.img = undefined;
    this.stock = undefined;
  }
}
