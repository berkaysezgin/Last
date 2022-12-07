import { Pipe, PipeTransform } from '@angular/core';

import { Products } from '../models/products';

@Pipe({
  name: 'filterProductByPrice',
})
export class FilterProductByPricePipe implements PipeTransform {
  transform(
    products: Products[],
    price: number,
    operator: 2 | 3| 4 | 5 | 1 = 1
  ): Products[] {
    if (price <= 0) return products;
    let filteredProducts: Products[] = products;

    //filteredProducts => içini doldurma
    switch (operator) {
      case 1:
        filteredProducts = products.filter((p) => p.unitPrice == price);
        break;
      case 2:
        filteredProducts = products.filter((p) => p.unitPrice <= price);
        break;
      case 3:
        filteredProducts = products.filter((p) => p.unitPrice >= price);
        break;
      case 4:
        filteredProducts = products.filter((p) => p.unitPrice > price);
        break;
      case 5:
        filteredProducts = products.filter((p) => p.unitPrice < price);
        break;
    }

    return filteredProducts;
  }
}