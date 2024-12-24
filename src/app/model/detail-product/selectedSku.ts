import {Color} from '../color';
import {Size} from '../sizes';

export interface SelectedSku{
  id: number;
  originalPrice : number;
  salePrice : number;
  color : Color;
  size : Size;
}
