import { ProductResponse } from './product-response.model';

export interface AddedProduct extends ProductResponse {
  amount: number;
}
