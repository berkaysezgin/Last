import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryFormPageComponent } from './pages/category-form-page/category-form-page.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { DashboardCategoriesListComponent } from './components/dashboard-categories-list/dashboard-categories-list.component';
import { DashboardCategoriesPageComponent } from './pages/dashboard-categories-page/dashboard-categories-page.component';
import { DashboardProductsPageComponent } from '../products/pages/dashboard-products-page/dashboard-products-page.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CategoryListComponent,CategoryFormComponent,DashboardCategoriesPageComponent,DashboardCategoriesListComponent,CategoryFormPageComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule
  ],
  exports:[CategoryListComponent,CategoryFormPageComponent,DashboardCategoriesPageComponent]
})
export class CategoriesModule { }
