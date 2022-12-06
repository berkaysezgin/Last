import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  dateNow:Date=new Date();
@Input() product!:Products;
@Output() onAddtoCartClick=new EventEmitter<Products>();

addToCartClick(){
  // Parent componenti uyar!!
    // Event emitter'i triggerla
    // emit et
    this.onAddtoCartClick.emit(this.product);
}
}
