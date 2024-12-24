import {Color} from './Color';
import {Size} from './Size';

export interface SKU {
  id: number;
  qtyInStock: number;
  originalPrice: number;
  salePrice: number;
  color: Color;
  size: Size;

}
