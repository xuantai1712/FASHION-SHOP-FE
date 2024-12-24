import {SkuResponse} from './SkuResponse';

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  productImage: string | "";
  skuResponse: SkuResponse;
  create_at: string;
  update_at: string;
}
