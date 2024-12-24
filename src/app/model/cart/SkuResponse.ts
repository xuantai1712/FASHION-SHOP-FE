import {Color} from '../color';
import {Size} from '../sizes';

export interface SkuResponse  {
  id: number;
  qtyInStock: number;
  originalPrice: number;
  salePrice: number;
  color: Color;
  size: Size;
}
