import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{
  path:'cart-summary',
  component: CartSummaryComponent,
  canActivate:[AuthGuard],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
