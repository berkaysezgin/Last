import { BehaviorSubject, Observable } from 'rxjs';
import { addItemToCart, removeItemFromCart } from 'src/app/shared/store/cart/cart.actions';

import { CartItem } from '../models/cartItem';
import { Injectable } from '@angular/core';
import { SharedState } from 'src/app/shared/store/shared.reducers';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemModel$: Observable<CartItem[]>=this.store.select((state)=>state.cart);

cartItems: BehaviorSubject<CartItem[]>=new BehaviorSubject<CartItem[]>([]);
  constructor(private store:Store<SharedState>) { }
  add(cartItem:CartItem){
    // Sepeti kontrol et, aynı üründen varsa adeti gelen adet kadar arttır.
    // Aynı üründen yoksa direkt ekle.
    // id atama işlemi
    let sameProduct=this.cartItems.value.find((i)=>
    i.product.id==cartItem.product.id);
    if(sameProduct){
      sameProduct.quantity+=cartItem.quantity;
      // yeni değerler ile cartItems'i değiştir..
      this.cartItems.next([...this.cartItems.value.filter((i)=>i.product.id != cartItem.product.id),
      sameProduct,]);
      return;
    }
    //gelen yeni ürünü direkt sepete ekle
    cartItem.id = Math.floor(Math.random() * 9999999);
    this.cartItems.next([...this.cartItems.value,cartItem]);  
  }
  remove(id:number){
    //gelen id değeri ile cartItem ara,bulursan sil..
    this.cartItems.next(this.cartItems.value.filter((i)=>i.id!=id))
  }

addState(cartItem:CartItem){
//state'i çağır
//action'ı çağırmak için =>dispatch;
this.store.dispatch(addItemToCart(cartItem));


}
removeState(id:number){
this.store.dispatch(removeItemFromCart({id}));
}

}
