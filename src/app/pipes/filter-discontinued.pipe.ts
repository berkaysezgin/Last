import { OnInit, Pipe, PipeTransform } from '@angular/core';

import { Products } from '../features/products/models/products';

@Pipe({
  name: 'filterDiscontinued'
})
export class FilterDiscontinuedPipe implements PipeTransform {

  transform(products: Products[], discontinued: boolean): Products[] {
    let filteredProducts: Products[] = products;
    filteredProducts = products.filter((p) => p.discontinued == discontinued);
    return filteredProducts;
  } 
 
  }

