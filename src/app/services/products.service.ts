import { GetListOptionsType } from '../models/get-list-options';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../models/products';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public controllerUrl:string=`${environment.apiUrl}/products`;
  
  constructor(private httpClient:HttpClient) {}
    //undefined ve null ikilik sistemde karşılıkları 00000000 olucak
    //undefined ilgili değişkenin tanımlanmamış olduğunu belirtir.
    //null ilgili değişikliğin tanımlanmış olduğunu fakat null değer geçildiğini söyleyen. Programcılar geçiyoruz.
    //aldığımız değişkeni obje yapma
    //{pagination}:{pagination?:Pagination}={} okuması biraz zor olduğu için tercih etmedik.
  getProducts(options?:GetListOptionsType): Observable<Products[]>{
   // const{pagination}=options??{};
    //query parametreleri opsiyonel 
    let queryParams: any={};
    if(options?.pagination) {
      queryParams['_page'] =options.pagination.page;
      queryParams['_limit']=options.pagination.pageSize;
    }
    if(options?.filters){
      queryParams={...queryParams,...options.filters}
    }
      return this.httpClient.get<Products[]>(this.controllerUrl,{
        params:queryParams,
      });
    };
   }
   //http://localhost:3000/products?_page=1&limit=9

