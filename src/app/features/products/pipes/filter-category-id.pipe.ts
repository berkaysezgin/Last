import { Pipe, PipeTransform } from '@angular/core';

import { Filter } from '../../../models/filter';

@Pipe({
  name: 'filterCategoryId'
})
export class FilterCategoryIdPipe implements PipeTransform {

  transform(products: Filter[], categoryId:number,discontinued: boolean=false,name:string,price:number,
    operator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq' = 'eq' ):Filter[]  {
      let filteredProducts: Filter[] = products;
//filter modeli yerine products modeli

      if(price >=0 )  {
        // Name
        filteredProducts = filteredProducts.filter((p)=>p.name.toLowerCase().includes(name.toLowerCase()))
        // Price
        // if (price <= 0) return filteredProducts;
        if(price>0)
          switch (operator) {
            case 'eq':
              filteredProducts = filteredProducts.filter((p) => p.unitPrice == price);
              break;
              case 'lte':
              filteredProducts = filteredProducts.filter((p) => p.unitPrice <= price);
              break;
            case 'gte':
              filteredProducts = filteredProducts.filter((p) => p.unitPrice >= price);
              break;
              case 'gt':
              filteredProducts = filteredProducts.filter((p) => p.unitPrice > price);
              break;
            case 'lt':
              filteredProducts = filteredProducts.filter((p) => p.unitPrice < price);
              break;
            }
       if(!categoryId) filteredProducts
       else {
         filteredProducts = filteredProducts.filter((p)=>p.categoryId === categoryId)
       }

        filteredProducts = filteredProducts.filter((p) => p.discontinued === discontinued)
  
      }
      return filteredProducts;
    }
  
  }
// }//let filteredProducts = products.filter((p) =>
// p.name.toLowerCase().includes(name.toLowerCase())
// );
// return filteredProducts;
