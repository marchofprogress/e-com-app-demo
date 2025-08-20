import { ProductResponse } from './product-response.model';

export type ProductUI = {
  currentAvailableAmount: number;
  currentMinOrderAmount: number;
} & Readonly<ProductResponse>;
