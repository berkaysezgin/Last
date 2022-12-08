import { Pipe, PipeTransform } from '@angular/core';

import { Filter } from '../models/filter';

@Pipe({
  name: 'filterProducts',
})
export  class FilterPipe implements PipeTransform {

  transform(products: Filter[], name: string): Filter[] {
    let filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    return filteredProducts;
  }
  
  
  }


