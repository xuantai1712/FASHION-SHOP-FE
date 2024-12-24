import {Size} from './sizes';
import {Color} from './color';

export interface SKU {
  id: number;
  qtyInStock: number;
  originalPrice: number;
  salePrice: number;
  color: Color;
  size: Size;
}
