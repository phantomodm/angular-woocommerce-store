import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from '../../components/product/product.component';
import { AddToCartMarketingComponent } from 'src/app/components/add-to-cart-marketing/add-to-cart-marketing.component';
import { AppUiComponentsModule } from '../app-ui-components/app-ui-components.module';


@NgModule({
  declarations: [
    ProductComponent,
    AddToCartMarketingComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    AppUiComponentsModule
  ]
})
export class ProductModule { }
