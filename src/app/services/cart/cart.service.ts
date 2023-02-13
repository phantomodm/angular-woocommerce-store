import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Cart, CartTotals } from 'src/app/interfaces/cart.interface';
import { Product } from 'src/app/interfaces/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any>([]);
  private quantityInCart = new Subject<any>();
  private successAddedToCart = new Subject<boolean>();

  cart$: Observable<any> = this.cart.asObservable();
  cartItems:any = []; //local to this service
  quantityInCart$: Observable<any> = this.quantityInCart.asObservable();
  successAddedToCart$: Observable<boolean> = this.successAddedToCart.asObservable();

  constructor() { }
  quickTest(event: string){
    console.log(document.querySelector(`[data-btn-value="${event}"]`))
    const el = document.querySelector(`[data-btn-value="${event}"]`) as HTMLElement;
    el.style.display = 'none'
  }
  addToCart(payload:
    {item: Cart;
    price: any;
    qty: number;
    product: Partial<Product>;}
  ){
    console.log(this.cartItems.length)
    if(this.cartItems.length === 0){
      console.log('Adding first product');
      this.cartItems.push({
        item: payload.item,
        quantity: payload.qty,
        price: +payload.price,
        product: payload.product
      });
    } else {
      console.log('Adding new product');
      const newEntry = {
        item: payload.item,
        quantity: payload.qty,
        price: +payload.price,
        product: payload.product
      }
      const productMatch = (p: any) => p.item.product_id === newEntry.item.product_id;
      const checkForUpdate = () => {
        this.updateCartItem(newEntry, productMatch, 'simple');
      }
      checkForUpdate();
      console.log('fast-foward')
    }

    this.cart.next(this.cartItems);
    this.totalQuantityInCart();
    this.successAddedToCart.next(true);
  }

  /** Calculate total of line items added to cart */
  calculateTotalPrice(payload?: {price?: any; quantity: number}): number{
    let currentPrice = 0.0;
    if(payload !== undefined){
      const quantity = payload.quantity;
      const price = payload.price;
      if (quantity > 1){
        return currentPrice + (price * quantity);
      } else {
        return currentPrice += price;
      }
    } else {
      return 0;
    }
  }


  /**Calculate the total quantity of items in the cart */
  totalQuantityInCart(): CartTotals {
    let quantity = 0;
    let price = 0.0;
    let cartTotals: any = {};
    this.cartItems.forEach(
      (i:any) => {
        quantity += +i.quantity;
        price += i.product.price * quantity //total per item * current quantity
      }
    );
    cartTotals = { quantity, total: price };
    this.quantityInCart.next(cartTotals);
    return cartTotals
  }

  /**Update product already in cart by index. Executed in addtoCart function */
  async updateCartItem(payload: any, match: any, mode: string){
    console.log(payload)
    try {
      switch(mode) {
        case 'simple':
          const cartItem = this.cartItems.findIndex(match);

          if(this.cartItems[cartItem]){
            this.cartItems[cartItem].quantity = +this.cartItems[cartItem].quantity + +payload.quantity;

            this.cartItems[cartItem].price = this.calculateTotalPrice({
              price: this.cartItems[cartItem].product.price,
              quantity: this.cartItems[cartItem].quantity
            })

          } else {
            this.cartItems.push(payload);
          }
          break;
        default:
          break;
      }

    } catch (error) {

    }
  }


}
