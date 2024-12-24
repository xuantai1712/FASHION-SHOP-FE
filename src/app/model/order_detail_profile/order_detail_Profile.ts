import {SkuResponse} from '../cart/SkuResponse';
import {OrderDetailsResponse} from './OrderDetailsResponse';
import {ProfileProductResponse} from './ProfileProductResponse';

export interface OrderDetailProfile {
  orderId: string;
  profileProductReponse: ProfileProductResponse;
  orderdetailsResponses: OrderDetailsResponse[];
  shippingAddress: string;
  status: string;
  paymentMethod: string;
  shippingMethod: string;
  totalPrice: number;
  productImage: string;
  quantity: number;
  create_at: Date ;
  update_at: Date;


}

