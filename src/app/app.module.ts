import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonDirective } from './directives/button.directive';
import { CartComponent } from './pages/cart/cart.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryFormPageComponent } from './pages/category-form-page/category-form-page.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { DashboardCategoriesListComponent } from './components/dashboard-categories-list/dashboard-categories-list.component';
import { DashboardCategoriesPageComponent } from './pages/dashboard-categories-page/dashboard-categories-page.component';
import { DashboardProductsListComponent } from './components/dashboard-products-list/dashboard-products-list.component';
import { DashboardProductsPageComponent } from './pages/dashboard-products-page/dashboard-products-page.component';
import { DateInterceptor } from './interceptors/date.interceptor';
import { DiscontinuedProductCardComponent } from './components/discontinued-product-card/discontinued-product-card.component';
import { FilterCategoryIdPipe } from './pipes/filter-category-id.pipe';
import { FilterDiscontinuedPipe } from './pipes/filter-discontinued.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterProductByPricePipe } from './pipes/filter-product-by-price.pipe';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    ProductListComponent,
    HomePageComponent,
    LoginPageComponent,
    LoadingSpinnerComponent,
    ProductFormComponent,
    ProductFormPageComponent,
     DashboardProductsPageComponent,
     DashboardProductsListComponent,
     CategoryFormComponent,
    DashboardCategoriesPageComponent,
     DashboardProductsPageComponent,
     DashboardCategoriesListComponent,
     CategoryFormPageComponent,
     DashboardCategoriesPageComponent,
     ProductCardComponent,
     FilterProductPipe,
     FilterProductByPricePipe,
     HighlightDirective,
     ButtonDirective,
     FilterPipe,
     FilterCategoryIdPipe,
     FilterDiscontinuedPipe,
     DiscontinuedProductCardComponent,
     TodoListComponent,
     TodoItemComponent,
     CartListComponent,
     CartComponent,
     
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
     ToastrModule.forRoot(), CoreModule, SharedModule, 
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
