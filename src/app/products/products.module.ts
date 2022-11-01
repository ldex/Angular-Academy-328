import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule
  ],
  exports: [ProductListComponent],
  declarations: [
    ProductDetailComponent,
    ProductListComponent
  ]
})
export class ProductsModule { }
