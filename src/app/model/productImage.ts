import {Color} from './color';

export interface ProductImage {
  id: number;
  imageUrl: string;
  productId: number;
  colorId: number;
  thumbnail: boolean;
}
