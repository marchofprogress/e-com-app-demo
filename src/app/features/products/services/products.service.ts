import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AddedProduct } from '../../models/added-product.model';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiBaseUrl = environment.baseUrl;
  private productUrl = `${this.apiBaseUrl}/wis/clicktime/v1/query?url=https%3a%2f%2f63c10327716562671870f959.mockapi.io%2fproducts&umid=edab3d48-7a50-4ca6-b6c9-9362af456f60&auth=3bd1ed0ea25e030aebac2180cda48b2d7a1ccc30-bf53e959aa381ef3b79ace2237ee4d9545bb0e5b`;
  private httpClient = inject(HttpClient);

  private productsInCartSubject = new BehaviorSubject<
    Record<string, AddedProduct>
  >({});
  public productsInCart$ = this.productsInCartSubject.asObservable();
  public cartTotal$: Observable<number> = this.productsInCart$.pipe(
    switchMap((cart) => {
      let total = 0;
      for (const [key, value] of Object.entries(cart)) {
        total += value.amount * value.price;
      }
      return of(total);
    })
  );

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productUrl);
  }

  addProductToCart(addedProduct: AddedProduct): void {
    const currentCart = this.productsInCartSubject.getValue();

    const amountAlreadyInCart =
      (currentCart[addedProduct.id]?.amount || 0) + addedProduct.amount;

    if (amountAlreadyInCart < addedProduct.minOrderAmount) {
      window.alert('Cannot add less than minimum order amount');
      return;
    }

    if (addedProduct.amount > addedProduct.availableAmount) {
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

    this.productsInCartSubject.next(updatedCart);
  }

  removeFromCart(productId: string): void {
    const currentCart = this.productsInCartSubject.getValue();
    const updatedCart = Object.fromEntries(
      Object.entries(currentCart).filter(([key, _value]) => key !== productId)
    );
    this.productsInCartSubject.next(updatedCart);
  }

  clearCart(): void {
    this.productsInCartSubject.next({});
  }
}
