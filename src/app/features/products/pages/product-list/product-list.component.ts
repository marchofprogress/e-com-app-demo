import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { ProductComponent } from '../../../../shared/components/product/product.component';
import { AddedProduct } from '../../../models/added-product.model';
import { ProductResponse } from '../../../models/product-response.model';
import { ProductUI } from '../../../models/product-ui.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  imports: [NgFor, NgIf, ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProductListComponent {
  productsService = inject(ProductsService);

  isLoading: Signal<boolean> = this.productsService.isLoading;
  hasError: Signal<unknown> = this.productsService.hasError;

  products: Signal<ProductUI[]> = computed(() => {
    const products = this.productsService.products();
    const productsInCart = this.productsService.productsInCart();
    return products.map((product: ProductResponse) => ({
      ...product,
      currentAvailableAmount:
        product.availableAmount - (productsInCart[product.id]?.amount || 0),
      currentMinOrderAmount:
        (productsInCart[product.id]?.amount || 0) - product.minOrderAmount < 0
          ? product.minOrderAmount - (productsInCart[product.id]?.amount || 0)
          : 1,
    }));
  });

  addToCart(product: AddedProduct): void {
    this.productsService.addProductToCart(product);
  }

  trackByProductId(index: number, item: any): string {
    return item.id;
  }
}
