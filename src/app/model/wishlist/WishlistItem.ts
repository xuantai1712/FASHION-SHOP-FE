import {SkuResponse} from '../cart/SkuResponse';

export interface WishlistItem{
  id: number;
  productId: number;
  productName: string;
  price: number;
  productImage: string | "";
  skuResponse: SkuResponse;
}
