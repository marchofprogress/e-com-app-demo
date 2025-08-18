import { Product } from "./product.model";

export interface AddedProduct extends Product {
  amount: number;
}
