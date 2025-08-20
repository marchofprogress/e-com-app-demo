import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../../../features/products/services/products.service';
import { ButtonDirective } from '../../button.directive';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CurrencyPipe, ButtonDirective, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NavbarComponent {
  productService = inject(ProductsService);
  cartTotal: Signal<number> = this.productService.cartTotal;
}
