import { Pipe, PipeTransform } from '@angular/core';

import { Products } from '../models/products';

@Pipe({
  name: 'filterProductByPrice'
})
export class FilterProductByPricePipe implements PipeTransform {

  transform(products: Products[], unitPrice:number,operator?:string): Products[] {
    if(operator=='gt'){
      let filterProductByPrice =products.filter((p)=>p.unitPrice>(unitPrice));
    return filterProductByPrice;
    }
    if(operator=='lt'){
      let filterProductByPrice =products.filter((p)=>p.unitPrice<(unitPrice));
    return filterProductByPrice;
    }
    if(operator=='gte'){
      let filterProductByPrice =products.filter((p)=>p.unitPrice>=(unitPrice));
    return filterProductByPrice;
    }
    if(operator=='le'){
      let filterProductByPrice =products.filter((p)=>p.unitPrice<=(unitPrice));
    return filterProductByPrice;
    }
    else(operator=="")
    let filterProductByPrice =products.filter((p)=>p.unitPrice==(unitPrice));
    return filterProductByPrice;
  }

}
