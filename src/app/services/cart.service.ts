import { CartItem } from '../models/cartItem';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../models/products';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
controllerUrl:string=`${environment.apiUrl}/carts`;
cartItem!:CartItem[]
  constructor(private httpClient:HttpClient) { }

  getList():Observable<CartItem[]>{
    return this.httpClient.get<CartItem[]>(this.controllerUrl);
  }
  addToCart(request:Products):Observable<CartItem>{
    return this.httpClient.post<CartItem>(this.controllerUrl,request)
  }
   delete(productId:number): Observable<CartItem[]> {
     return this.httpClient.delete<CartItem[]>(
       `${this.controllerUrl}/${productId}`
     );
  }
}
