import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './Components/product/product.component';
import { CartSummaryComponent } from './Components/cart-summary/cart-summary.component';
import { ProductAddComponent } from './Components/product-add/product-add.component';
import { UserAddComponent } from './Components/user-add/user-add.component';
import { FinishShoppingComponent } from './Components/finish-shopping/finish-shopping.component';

const routes: Routes = [
  {
    path:'',
    component:ProductComponent
  },
  {
    path:'products',
    component:ProductComponent
  },
  {
    path:'products/category/:id',
    component:ProductComponent
  },
  {
    path:'cart-summary',
    component:CartSummaryComponent
  },
  {
    path:'product-add',
    component:ProductAddComponent
  },
  {
    path:'user-add',
    component:UserAddComponent
  },
  {
    path:'finish-shopping',
    component:FinishShoppingComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
