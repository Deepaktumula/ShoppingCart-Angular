import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { PageNotfoundComponent } from './components/page-notfound/page-notfound.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './service/auth.guard';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { OrdersuccessComponent } from './components/ordersuccess/ordersuccess.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
  // Default Route
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  // Login Route
  {
    path: 'login',
    component: LoginComponent,
  },
  // Layout Route
  {
    path: '',
    component: LayoutComponent,
    // To restrict the Routes on if not logged in
    canActivate: [authGuard],
    // Children Routes
    children: [
      // Product Route
      {
        path: 'products',
        component: ProductComponent,
      },
      // All-Products Route to display products in Card Style
      {
        path: 'all-products',
        component: AllProductsComponent,
      },
      // Product-Details Route
      {
        path: 'product-details/:id',
        component: ProductDetailsComponent,
      },
      // Cart Route
      {
        path: 'cart',
        component: CartComponent,
      },
      // OrderSuccess Route
      {
        path: 'order-success',
        component: OrdersuccessComponent,
      },
      // Payment Route
      {
        path:'payment',
        component: PaymentComponent,
      },
      // Wilcard Route
      {
        path: '**',
        component: PageNotfoundComponent,
      },
    ],
  },
];
