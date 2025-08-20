import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddedProduct } from '../../../models/added-product.model';
import { ProductResponse } from '../../../models/product-response.model';
import { ProductsService } from '../../services/products.service';
import { ProductListComponent } from './product-list.component';

const mockProduct: ProductResponse = {
  id: '1',
  name: 'Test',
  img: '',
  availableAmount: 100,
  minOrderAmount: 3,
  price: 100,
};

class MockProductsService {
  productsInCart: () => Record<string, AddedProduct> = () => ({
    1: {
      id: '1',
      name: 'Test',
      img: '',
      availableAmount: 1,
      minOrderAmount: 1,
      price: 1,
      amount: 3,
    },
  });
  cartTotal = () => 1;
  products = () => [mockProduct];
  isLoading = () => false;
  hasError = () => false;
  removeFromCart = jasmine.createSpy('removeFromCart');
  clearCart = jasmine.createSpy('clearCart');
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductsService: MockProductsService;

  beforeEach(async () => {
    mockProductsService = new MockProductsService();
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate currentAvailableAmount to be 97 when has 3 in cart', () => {
    expect(component.productsVM()[0].currentAvailableAmount).toBe(97);
  });

  it('should calculate currentMinOrderAmount to be 1 when minOrderAmount has in cart', () => {
    expect(component.productsVM()[0].currentMinOrderAmount).toBe(1);
  });

  it('should calculate currentMinOrderAmount to be 3 when has 0 in cart', () => {
    mockProductsService.productsInCart = () => ({});

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.productsVM()[0].currentMinOrderAmount).toBe(3);
  });
});
