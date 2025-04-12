export interface ProductI {
  id: number;
  title: string;
  images: null | string[];
  price: number;

  discountPercentage: null | number;
}
