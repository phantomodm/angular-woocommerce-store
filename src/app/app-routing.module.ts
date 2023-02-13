import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/body/body.module').then((m) => m.BodyModule),
  },
  {
    path: 'product',
    children: [
      {
        path: ':slug',
        loadChildren: () =>
          import('./modules/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./modules/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
    ],
  },
  {
    path: 'category',
    children: [
      {
        path: ':slug',
        loadChildren: () =>
          import('./modules/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'shop',
        loadChildren: () =>
        import('./modules/category/category.module').then(
          (m) => m.CategoryModule
        ),
      },
    ],
  },
  {
    path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then((m) => m.CartModule)
  },
  {
    path: 'checkout', loadChildren: () => import('./modules/checkout/checkout.module').then((m) => m.CheckoutModule)
  },
  { path: 'page-not-found', component: Page404Component},
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
