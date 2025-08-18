import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddedProduct } from '../../../features/models/added-product.model';
import { Product } from '../../../features/models/product.model';
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
  @Input({ required: true }) product!: Product;
  @Input() currentMinOrderAmount: number = 1;
  @Output() addedProductEmitter = new EventEmitter<AddedProduct>();

  addedProductAmount: number = 0;

  ngOnInit() {
    this.addedProductAmount = this.currentMinOrderAmount;
  }

  addProduct() {
    this.addedProductEmitter.emit({
      ...this.product,
      amount: this.addedProductAmount,
    });
  }
}
