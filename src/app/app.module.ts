import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonDirective } from './shared/directives/button.directive';
import { CartModule } from './features/cart/cart.module';
import { CategoriesModule } from './features/categories/categories.module';
import { CategoryFormComponent } from './features/categories/components/category-form/category-form.component';
import { CategoryFormPageComponent } from './features/categories/pages/category-form-page/category-form-page.component';
import { CategoryListComponent } from './features/categories/components/category-list/category-list.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { DashboardCategoriesListComponent } from './features/categories/components/dashboard-categories-list/dashboard-categories-list.component';
import { DashboardCategoriesPageComponent } from './features/categories/pages/dashboard-categories-page/dashboard-categories-page.component';
import { DashboardProductsListComponent } from './features/products/components/dashboard-products-list/dashboard-products-list.component';
import { DashboardProductsPageComponent } from './features/products/pages/dashboard-products-page/dashboard-products-page.component';
import { DateInterceptor } from './core/interceptors/date.interceptor';
import { FilterCategoryIdPipe } from './features/products/pipes/filter-category-id.pipe';
import { FilterDiscontinuedPipe } from './pipes/filter-discontinued.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterProductByPricePipe } from './pipes/filter-product-by-price.pipe';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductFormPageComponent } from './features/products/pages/product-form-page/product-form-page.component';
import { ProductsModule } from './features/products/products.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { TodoItemComponent } from './shared/components/todo-item/todo-item.component';
import { TodoListComponent } from './shared/components/todo-list/todo-list.component';
import { sharedReducers } from './shared/store/shared.reducers';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
     FilterProductPipe,
     FilterProductByPricePipe,
     FilterPipe,
  ], // HTML tarafındaki angular bileşenlerini tanımlar
  imports: [
     BrowserModule,
     AppRoutingModule,
     FormsModule,
     HttpClientModule,
     NgxPaginationModule,
     ReactiveFormsModule,
     CommonModule,
     BrowserAnimationsModule, 
     ToastrModule.forRoot(),
      CoreModule,
       SharedModule,
        ProductsModule,
         CategoriesModule,
          CartModule,
         
  ], //ANgular modülleri import edeceğimiz yer
  exports:[],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:DateInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:AuthorizationInterceptor,multi:true}
  ], // IoC Container'daki Dependency Injection'ları tanımlar
  bootstrap: [AppComponent], // Hangi bileşenin ilk açıldığında çalışacağını belirtir
})
export class AppModule {}
