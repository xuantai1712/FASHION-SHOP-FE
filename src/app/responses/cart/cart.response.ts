

export interface CartItemResponse {
  id: number | null;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  productImage: string;
  skuResponse: SkuResponse;
  create_at: string | null;
  update_at: string | null;
}

export interface SkuResponse {
  id?: number;
  qtyInStock: number;
  originalPrice: number;
  salePrice: number;
  color: ColorResponse;
  size: SizeResponse;
}

export interface ColorResponse {
  id: number;
  name: string;
  value_img: string;
}

export interface SizeResponse {
  id: number;
  name: string;
}
