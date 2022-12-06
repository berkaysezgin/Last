import { Pipe, PipeTransform } from '@angular/core';

import { Products } from '../models/products';

@Pipe({
  name: 'filterProduct',
})
export class FilterProductPipe implements PipeTransform {
  transform(products: Products[], name: string): Products[] {
    let filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    return filteredProducts;
  }
}