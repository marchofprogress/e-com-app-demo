import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { ProductComponent } from '../../../../shared/components/product/product.component';
import { AddedProduct } from '../../../models/added-product.model';
import { Product } from '../../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  imports: [NgFor, ProductComponent, NgIf, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProductListComponent {
  productsService = inject(ProductsService);

  products: Observable<(Product & { currentMinOrderAmount: number })[]> =
    combineLatest([
      this.productsService.getProducts(),
      this.productsService.productsInCart$,
    ]).pipe(
      map(([products, productsInCart]) =>
        products.map((product: Product) => ({
          ...product,
          availableAmount:
            product.availableAmount - (productsInCart[product.id]?.amount || 0),
          currentMinOrderAmount:
            (productsInCart[product.id]?.amount || 0) - product.minOrderAmount <
            0
              ? product.minOrderAmount -
                (productsInCart[product.id]?.amount || 0)
              : 1,
        }))
      )
    );

  addToCart(product: AddedProduct) {
    this.productsService.addProductToCart(product);
  }

  trackByProductId(index: number, item: any): string {
    return item.id;
  }
}
