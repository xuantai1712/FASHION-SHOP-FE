import {SelectedSku} from './selectedSku';
import {SelectedImage} from './selectedImage';
import {SKU} from '../SKU';
import {ProductImage} from '../productImage';

export interface DetailProduct {
  id: number;
  name: string;
  description : string;
  selectedSku : SelectedSku;
  selectedImage : SelectedImage;
  skus : SKU[];
  productImages : ProductImage[];
}
