import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = sessionStorage;

  constructor() { 
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data != null) {
      this.cartItems = data;

      this.computeCartTotals();
    }
  }

  addToCart(cartItemToAdd: CartItem) {
    const cartItemFound : CartItem | undefined = this.cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if(cartItemFound != undefined) {
      cartItemFound.quantity += 1;
    } 
    else {
      this.cartItems.push(cartItemToAdd);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPrice: number = 0;
    let totalQuantity: number = 0;

    this.cartItems.forEach(cartItem => {
      totalPrice += cartItem.unitPrice * cartItem.quantity;
      totalQuantity += cartItem.quantity;
    });

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    this.persistCartItems();
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.removeCartItem(cartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  removeCartItem(cartItemToRemove: CartItem) {
    const itemIndex = this.cartItems.findIndex(cartItem => cartItem.id === cartItemToRemove.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}
