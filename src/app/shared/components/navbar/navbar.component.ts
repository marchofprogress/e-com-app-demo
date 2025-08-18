import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../features/products/services/products.service';
import { ButtonDirective } from '../../button.directive';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink, CurrencyPipe, ButtonDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NavbarComponent {
  productService = inject(ProductsService);
  cartTotal$: Observable<number> = this.productService.cartTotal$;
}
