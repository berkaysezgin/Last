import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';
import { Component } from '@angular/core';
import { Products } from 'src/app/models/products';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent {
  cartItem!:CartItem[]
  product!:Products[]
constructor(private cartService:CartService,
  private toastrService:ToastrService,
  private router:Router){

}

ngOnInit():void{
  this.getListCart();
  console.log(this.cartItem);
}
getListCart()
{
  this.cartService.getList().subscribe((response)=>{
  this.cartItem=response;
  console.log(this.cartItem);
  })
}
onDeleteProductOnCart(productId:number):void{
  if (confirm('Are you sure you want to delete this product?') === false)
  return;
this.delete(productId);
}
delete(productId:number): void {
  
  this.cartService.delete(productId).subscribe((response) => {
    this.cartItem=response;
    this.toastrService.success('Product deleted successfully');
    this.router.navigate(['/carts']);
    this.getListCart();
  });
}
}