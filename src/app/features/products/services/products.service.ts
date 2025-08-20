import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AddedProduct } from '../../models/added-product.model';
import { ProductResponse } from '../../models/product-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly apiBaseUrl = environment.baseUrl;
  private readonly productUrl = `${this.apiBaseUrl}/wis/clicktime/v1/query?url=https%3a%2f%2f63c10327716562671870f959.mockapi.io%2fproducts&umid=edab3d48-7a50-4ca6-b6c9-9362af456f60&auth=3bd1ed0ea25e030aebac2180cda48b2d7a1ccc30-bf53e959aa381ef3b79ace2237ee4d9545bb0e5b`;
  private readonly httpClient = inject(HttpClient);

  private readonly _productsInCart = signal<Record<string, AddedProduct>>({});

  public get productsInCart(): Signal<Record<string, AddedProduct>> {
    return this._productsInCart.asReadonly();
  }

  public cartTotal: Signal<number> = computed(() => {
    let total = 0;
    for (const [key, value] of Object.entries(this.productsInCart())) {
      total += value.amount * value.price;
    }
    return total;
  });

  private readonly productResource = httpResource<ProductResponse[]>(
    {
      url: this.productUrl,
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    },
    { defaultValue: [] }
  );

  readonly products = this.productResource.value.asReadonly();
  isLoading = this.productResource.isLoading;
  hasError = this.productResource.error;

  addProductToCart(addedProduct: AddedProduct): void {
    const currentCart = this.productsInCart();

    const amountAlreadyInCart = currentCart[addedProduct.id]?.amount || 0;

    if (
      amountAlreadyInCart + addedProduct.amount <
      addedProduct.minOrderAmount
    ) {
      window.alert('Cannot add less than minimum order amount');
      return;
    }

    if (
      amountAlreadyInCart + addedProduct.amount >
      addedProduct.availableAmount
    ) {
      window.alert('Cannot add more than available amount');
      return;
    }

    const updatedCart = {
      ...currentCart,
      [addedProduct.id]: {
        ...addedProduct,
        amount:
          (currentCart[addedProduct.id]?.amount || 0) + addedProduct.amount,
      },
    };

    this._productsInCart.set(updatedCart);
  }

  removeFromCart(productId: string): void {
    const currentCart = this.productsInCart();
    const updatedCart = Object.fromEntries(
      Object.entries(currentCart).filter(([key, _value]) => key !== productId)
    );
    this._productsInCart.set(updatedCart);
  }

  clearCart(): void {
    this._productsInCart.set({});
  }
}
