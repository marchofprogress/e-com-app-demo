import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    component.product = {
      id: '1',
      name: 'Test Product',
      img: '',
      availableAmount: 10,
      minOrderAmount: 1,
      price: 100,
      currentAvailableAmount: 10,
      currentMinOrderAmount: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addedProductEmitter with correct amount', () => {
    spyOn(component.addedProductEmitter, 'emit');
    component.orderAmount.set(5);
    component.addProduct();
    expect(component.addedProductEmitter.emit).toHaveBeenCalledWith({
      ...component.product,
      amount: 5,
    });
  });

  it('should set addedProductAmount to currentMinOrderAmount on ngOnInit', () => {
    component.orderAmount.set(0);
    component.currentMinOrderAmount = 3;
    component.ngOnInit();
    expect(component.orderAmount()).toBe(3);
  });
});
