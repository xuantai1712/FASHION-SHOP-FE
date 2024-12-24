import {ProductImage} from '../productImage';


export interface ProfileProductResponse {
  id: number;
  name: string;
  productImages: ProductImage[];
}
