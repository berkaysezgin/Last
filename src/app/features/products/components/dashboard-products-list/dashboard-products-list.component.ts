import { Component } from '@angular/core';
import { Products } from 'src/app/features/products/models/products';
import { ProductsService } from 'src/app/features/products/services/products.service';

@Component({
  selector: 'app-dashboard-products-list',
  templateUrl: './dashboard-products-list.component.html',
  styleUrls: ['./dashboard-products-list.component.scss']
})
export class DashboardProductsListComponent {
  products!: Products[];
constructor(
  private productsService:ProductsService,
){}
  getProductsList():void{
this.productsService.getProducts().subscribe({
  next:(response)=>{
    this.products=response;
  },
 
 
})
  }
 ngOnInit():void{
  this.getProductsList();
 }
}
