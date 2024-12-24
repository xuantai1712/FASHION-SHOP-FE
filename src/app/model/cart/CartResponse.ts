import {CartItem} from './CartItem';

export interface CartResponse {
  message: string;
  totalPages: number;
  cartItem: CartItem[];
}
