import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsService } from '../../services/products.service';
import { CartComponent } from './cart.component';

class MockProductsService {
  productsInCart = () => ({
    test: {
      id: 'test',
      name: 'Test',
      img: '',
      availableAmount: 1,
      minOrderAmount: 1,
      price: 1,
      amount: 1,
    },
  });
  cartTotal = () => 1;
  removeFromCart = jasmine.createSpy('removeFromCart');
  clearCart = jasmine.createSpy('clearCart');
}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let productsService: MockProductsService;

  beforeEach(async () => {
    productsService = new MockProductsService();
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [{ provide: ProductsService, useValue: productsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeFromCart on service', () => {
    component.removeFromCart('test-id');
    expect(productsService.removeFromCart).toHaveBeenCalledWith('test-id');
  });

  it('should call clearCart on service when checkout', () => {
    component.checkout();
    expect(productsService.clearCart).toHaveBeenCalled();
  });
});
