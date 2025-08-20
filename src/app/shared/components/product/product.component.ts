import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddedProduct } from '../../../features/models/added-product.model';
import { ProductUI } from '../../../features/models/product-ui.model';
import { ButtonDirective } from '../../button.directive';

@Component({
  selector: 'app-product',
  imports: [FormsModule, CurrencyPipe, ButtonDirective],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ProductComponent implements OnInit {
  @Input({ required: true }) product!: ProductUI;
  @Input() currentMinOrderAmount = 1;
  @Output() addedProductEmitter = new EventEmitter<AddedProduct>();

  addedProductAmount: WritableSignal<number> = signal<number>(0);
  total: Signal<number> = computed(
    () => this.product.price * this.addedProductAmount()
  );

  ngOnInit() {
    this.addedProductAmount.set(this.currentMinOrderAmount);
  }

  onAmountChange(newAmount: number) {
    this.addedProductAmount.set(newAmount);
  }

  addProduct(): void {
    this.addedProductEmitter.emit({
      ...this.product,
      amount: this.addedProductAmount(),
    });
  }
}
