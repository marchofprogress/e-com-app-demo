import { TestBed } from '@angular/core/testing';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptorsFromDi())],
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add product to cart', () => {
    const product = {
      id: '1',
      name: 'Test',
      img: '',
      availableAmount: 10,
      minOrderAmount: 1,
      price: 100,
      amount: 1,
    };
    service.addProductToCart(product);
    expect(service.productsInCart().hasOwnProperty('1')).toBeTrue();
    expect(service.productsInCart()['1'].amount).toBe(1);
  });

  it('should remove product from cart', () => {
    const product = {
      id: '2',
      name: 'Test2',
      img: '',
      availableAmount: 5,
      minOrderAmount: 1,
      price: 50,
      amount: 2,
    };
    service.addProductToCart(product);
    service.removeFromCart('2');
    expect(service.productsInCart().hasOwnProperty('2')).toBeFalse();
  });

  it('should clear cart', () => {
    const product = {
      id: '3',
      name: 'Test3',
      img: '',
      availableAmount: 3,
      minOrderAmount: 1,
      price: 30,
      amount: 1,
    };
    service.addProductToCart(product);
    service.clearCart();
    expect(Object.keys(service.productsInCart()).length).toBe(0);
  });

  it('should calculate cartTotal correctly', () => {
    const product1 = {
      id: '1',
      name: 'Test',
      img: '',
      availableAmount: 10,
      minOrderAmount: 1,
      price: 100,
      amount: 2,
    };
    const product2 = {
      id: '2',
      name: 'Test2',
      img: '',
      availableAmount: 5,
      minOrderAmount: 1,
      price: 50,
      amount: 3,
    };
    service.addProductToCart(product1);
    service.addProductToCart(product2);
    expect(service.cartTotal()).toBe(
      product1.amount * product1.price + product2.amount * product2.price
    );
  });
});
