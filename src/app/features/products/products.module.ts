import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { DashboardProductsListComponent } from './components/dashboard-products-list/dashboard-products-list.component';
import { DashboardProductsPageComponent } from './pages/dashboard-products-page/dashboard-products-page.component';
import { DiscontinuedProductCardComponent } from './components/discontinued-product-card/discontinued-product-card.component';
import { FilterCategoryIdPipe } from './pipes/filter-category-id.pipe';
import { NgModule } from '@angular/core';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProductCardComponent,
    ProductFormComponent,
    ProductListComponent,
    FilterCategoryIdPipe,
    DashboardProductsListComponent,
    DiscontinuedProductCardComponent,
  DashboardProductsPageComponent,
  
ProductFormPageComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,CoreModule,FormsModule,ReactiveFormsModule,SharedModule
  ],
  exports:[FilterCategoryIdPipe,ProductListComponent,DashboardProductsPageComponent,ProductFormPageComponent,DashboardProductsPageComponent],
})
export class ProductsModule { }
