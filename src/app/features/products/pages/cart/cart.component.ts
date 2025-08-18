import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ButtonDirective } from '../../../../shared/button.directive';
import { AddedProduct } from '../../../models/added-product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, CurrencyPipe, AsyncPipe, ButtonDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  standalone: true,
})
export class CartComponent {
  productsService = inject(ProductsService);

  productsInCart$: Observable<Record<string, AddedProduct>> =
    this.productsService.productsInCart$;
  cartTotal$: Observable<number> = this.productsService.cartTotal$;

  removeFromCart(productId: string): void {
    this.productsService.removeFromCart(productId);
  }

  checkout(): void {
    this.productsService.clearCart();
  }
}
