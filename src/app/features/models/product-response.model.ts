export interface ProductResponse {
  readonly id: string;
  readonly name: string;
  readonly img: string;
  readonly availableAmount: number;
  readonly minOrderAmount: number;
  readonly price: number;
}
