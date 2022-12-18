import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CartItem } from 'src/app/features/cart/models/cartItem';
import { CartService } from 'src/app/features/cart/services/cart.service';
import { FormGroup } from '@angular/forms';
import { GetListOptionsType } from 'src/app/core/models/get-list-options';
import { NumberSymbol } from '@angular/common';
import { Pagination } from 'src/app/core/models/pagination';
import { Products } from 'src/app/features/products/models/products';
import { ProductsService } from 'src/app/features/products/services/products.service';
import { sequenceEqual } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productCardClass: string = 'card col-3 ms-3 mb-3';
  filterByCategoryId!: FormGroup;
  products!: Products[];
  // selectedProductCategoryId: number | null = null;
  searchProductNameInput: string | null = null;
  pagination: Pagination = {
    page: 1,
    pageSize: 9,
  };
  lastPage?: number;
  priceFilterType: 'gt' | 'lt' | 'gte' | 'lte' | 'eq' = 'eq';
  filters: any = { productFilterPrice: 0,filterByCategoryId:0,filterDiscontinued:false };

  //# Client Side Filter
  // get filteredProducts(): Product[] {
  //   let filteredProducts = this.products;
  //   if (!filteredProducts) return [];

  //   if (this.selectedProductCategoryId)
  //     filteredProducts = filteredProducts.filter(
  //       (p) => p.categoryId === this.selectedProductCategoryId
  //     );

  //   if (this.searchProductNameInput)
  //     filteredProducts = filteredProducts.filter(
  //       (p) =>
  //         p.name
  //           .toLowerCase()
  //           .includes(
  //             this.searchProductNameInput !== null
  //               ? this.searchProductNameInput.toLowerCase()
  //               : ''
  //           ) //: Non-null assertion operator: Sol tarafın null veya undefined olmadığı garanti edilir.
  //     );
  //   // {
  //   //   test: {
  //   //     test2: true
  //   //   }
  //   // }
  //   // object.test?.test2 //: Optional chaining: sağ tarafın obje içerisinde bulunmayabileceğini belirtiyoruz.

  //   return filteredProducts;
  // }
  isLoading: number = 0;
  errorAlertMessage: string | null = null;

  //: ActivatedRoute mevcut route bilgisini almak için kullanılır.
  //: Router yeni route bilgisi oluşturmak için kullanılır.
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private cartService:CartService,
  ) {}

  ngOnInit(): void {
    this.isLoading = this.isLoading + 2;
    this.getCategoryIdFromRoute();
    this.getSearchProductNameFromRoute();
  }
  onSearchPriceChange(event: any) {
    if (this.filters.productFilterPrice == null) {
      this.filters.productFilterPrice = 0;
    }
  }
  getProductsList(options?: GetListOptionsType): void {
    this.isLoading = this.isLoading + 1;

    //: Subject: Observable'ın bir alt sınıfıdır. Subject'lerin bir özelliği ise, bir Subject üzerinden subscribe olunan herhangi bir yerden next() metodu çağrıldığında, o Subject üzerinden subscribe olan her yerde bu değişiklik görülebilir.
    this.productsService.getProducts(options).subscribe({
      next: (response) => {
        //: Etiya projelerinde pagination bilgileri body içerisinde gelmektedir. Direkt atamayı gerçekleştirebiliriz.
        // this.pagination.page = response.page;
        // this.pagination.pageSize = response.pageSize;
        // this.lastPage = response.lastPage;
        //: Json-server projelerinde pagination bilgileri header içerisinde gelmektedir. Header üzerinden atama yapmamız gerekmektedir. Bu yöntem pek kullanılmayacağı için, bu şekilde geçici bir çözüm ekleyebiliriz.
        if (response.length < this.pagination.pageSize) {
          if (response.length === 0 && this.pagination.page > 1)
            this.pagination.page = this.pagination.page - 1;
          this.lastPage = this.pagination.page;
        }

        this.products = response;
        if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      },
      error: () => {
        this.errorAlertMessage = "Server Error. Couldn't get products list.";
        if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      },
      complete: () => {
        console.log('completed');
      },
    });
  }
  addToCartClick(product: Products) {
        // CartItem oluştur..
    // cartService'den add metodunu çağır..
   let cartItem:CartItem={
    product:product,quantity:1};
    this.cartService.add(cartItem);
   }
  
  addToStockClick(product:Products){

  }
  getCategoryIdFromRoute(): void {
    //: route params'ları almak adına activatedRoute.params kullanılır.
    this.activatedRoute.params.subscribe((params) => {
      this.resetPagination();

      if (params['categoryId']) {
        // this.selectedProductCategoryId = parseInt(params['categoryId']);
        this.filters['categoryId'] = parseInt(params['categoryId']);
      } else {
        // this.selectedProductCategoryId = null;
        // filters = { categoryId: 1 }
        if (this.filters['categoryId']) delete this.filters['categoryId']; //= filters = {}
        //: delete operatörü, object içerisindeki bir property'i silmek için kullanılır.
      }

      if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      if (this.isLoading === 0)
        this.getProductsList({
          pagination: this.pagination,
          filters: this.filters,
        });
    });
  }

  getSearchProductNameFromRoute(): void {
    //: query params'ları almak adına activatedRoute.queryParams kullanılır.
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      // && this.searchProductNameInput == null
      if (
        queryParams['searchProductName'] &&
        queryParams['searchProductName'] !== this.searchProductNameInput
      ) {
        this.searchProductNameInput = queryParams['searchProductName'];
        this.filters['name_like'] = this.searchProductNameInput;
      }
      //# Defensive Programming
      if (
        queryParams['searchProductName'] === undefined &&
        this.searchProductNameInput !== null
      ) {
        this.searchProductNameInput = null;
        delete this.filters['name_like'];
      }

      if (this.isLoading > 0) this.isLoading = this.isLoading - 1;
      if (this.isLoading === 0)
        this.getProductsList({
          pagination: this.pagination,
          filters: this.filters,
        });
    });
  }

  isProductCardShow(product: any): boolean {
    return product.discontinued == false;
  }

  // onSearchProductNameChange(event: any): void {
  //   // this.searchProductNameInput = event.target.value; //: ngModel'imiz kendisi bu işlemi zaten gerçekleştiriyor.

  //   this.filters['name_like'] = this.searchProductNameInput;
  //   this.resetPagination();

  //   const queryParams: any = {};
  //   if (this.searchProductNameInput !== '')
  //     queryParams['searchProductName'] = this.searchProductNameInput;
  //   this.router.navigate([], {
  //     queryParams: queryParams,
  //   });

    
  // }

  changePage(page: number): void {
    this.pagination.page = page;
    this.getProductsList({
      pagination: this.pagination,
      filters: this.filters,
    });
  }

  resetPagination(): void {
    this.pagination.page = 1;
    this.lastPage = undefined;
  }
  filtersByCategoryId(event:Event){
    this.filters.filterByCategoryId=Number((event.target as HTMLInputElement).value);}
    callAlert(text:string){
      alert(text);
    }


  }
