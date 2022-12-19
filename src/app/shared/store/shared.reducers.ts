import { CartItem } from "src/app/features/cart/models/cartItem"
import { cartReducer } from "./cart/cart.reducer"

// Store'da değer güncelleyen tüm reducerları tanımla..
export const sharedReducers={
    cart:cartReducer,
    //tüm reducerları tek bir objede toplamak adına yapılır.
}
export interface SharedState{
    cart:CartItem[];
    
}