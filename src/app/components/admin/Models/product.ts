import {ProductImage} from './ProductImage';
import {SKU} from './SKU';


export interface Product {
  id: number;
  name: string;
  description: String;
  categoryId: Number;
  skus: SKU[];
  productImages: ProductImage[];
  create_at: string;
  update_at: string;
}
