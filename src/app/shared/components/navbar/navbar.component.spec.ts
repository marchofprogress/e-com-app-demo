import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../features/products/services/products.service';
import { NavbarComponent } from './navbar.component';

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

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let productsService: MockProductsService;

  beforeEach(async () => {
    productsService = new MockProductsService();
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: ProductsService, useValue: productsService },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
