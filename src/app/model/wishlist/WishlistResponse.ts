import {WishlistItem} from './WishlistItem';

export interface WishlistResponse {
  message: string;
  totalPages: number;
  wishlistItems: WishlistItem[];
}
