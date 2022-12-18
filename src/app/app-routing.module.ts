import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { CategoryFormPageComponent } from './features/categories/pages/category-form-page/category-form-page.component';
import { DashboardCategoriesListComponent } from './features/categories/components/dashboard-categories-list/dashboard-categories-list.component';
import { DashboardCategoriesPageComponent } from './features/categories/pages/dashboard-categories-page/dashboard-categories-page.component';
import { DashboardProductsPageComponent } from './features/products/pages/dashboard-products-page/dashboard-products-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { ProductFormPageComponent } from './features/products/pages/product-form-page/product-form-page.component';

const routes: Routes = [
{path:'',pathMatch:'full',component:HomePageComponent},


{
  path: 'category/:categoryId',
  component: HomePageComponent,
  canActivate: [AuthGuard],
},
{path: 'dashboard', // Grand Parent route
  
children: [
  {
    path: 'products', // Parent route
    children: [
      {path:'',pathMatch:"full",component: DashboardProductsPageComponent},
      { path: 'add', component: ProductFormPageComponent },
      { path: 'edit/:productId', component: ProductFormPageComponent },
      
    ],
  },
],
canActivate: [AuthGuard],
},
{
  path: 'dashboard', // Grand Parent route
  
  children: [
    {
      path: 'categories', // Parent route
      children: [
        {path:'',pathMatch:"full",component: DashboardCategoriesPageComponent},
        { path: 'add', component: CategoryFormPageComponent },
        { path: 'edit/:categoryId', component: CategoryFormPageComponent },
      ],
    },
  ], //= dashboard/products/add
  canActivate: [AuthGuard],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
