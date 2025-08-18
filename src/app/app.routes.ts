import { Routes } from '@angular/router';
import { CartComponent } from './features/products/pages/cart/cart.component';
import { ProductListComponent } from './features/products/pages/product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
];
