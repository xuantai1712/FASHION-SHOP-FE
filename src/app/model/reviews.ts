import { SKU } from "./SKU";
import { User } from "./user/user";


export interface Reviews{
    id: number;
  comment: string;
  ratingValue: number;
  sku: SKU;
  user: User;
  create_at: string; // ISO format date as string
  update_at: string;
}