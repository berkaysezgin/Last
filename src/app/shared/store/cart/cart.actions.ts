// State'i değiştirecek fonksiyonların tanımlandığı nokta..

import { createAction, props } from "@ngrx/store";

import { CartItem } from "src/app/features/cart/models/cartItem";

//export => state'i değiştirecek aksiyonu uygulamanın herhangi bir yerinden çağırabilirim

// createAction 1. parametre (string)="[Cart] add Item To Cart"
//! unique olmalı !!!
export const addItemToCart = createAction(
    '[Cart] add Item To Cart',
    props<CartItem>()
    );
// addItemToCart(cartItem:CartItem){}
export const removeItemFromCart = createAction(
    '[Cart] Remove Item From Cart',
    props<{id:number}>()
);
//remove(id:number){}