import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './pages/cart/cart.component';
import { CategoryFormPageComponent } from './pages/category-form-page/category-form-page.component';
import { DashboardCategoriesListComponent } from './components/dashboard-categories-list/dashboard-categories-list.component';
import { DashboardCategoriesPageComponent } from './pages/dashboard-categories-page/dashboard-categories-page.component';
import { DashboardProductsPageComponent } from './pages/dashboard-products-page/dashboard-products-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component';

const routes: Routes = [
{path:'',pathMatch:'full',component:HomePageComponent},
{path:'category/:categoryId',component:HomePageComponent},
{path:'login',component:LoginPageComponent},
{path:'dashboard/products',component:DashboardProductsPageComponent},
{path:'carts',component:CartComponent},
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
],},
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
},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
