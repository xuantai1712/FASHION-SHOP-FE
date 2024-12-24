import {SkuResponse} from '../cart/SkuResponse';
import {SKU} from '../SKU';


export interface OrderDetailsResponse {
  skus: SKU[];
  quantity: number;
  price: number;
  totalMoney: number;
  productName: string;
}
