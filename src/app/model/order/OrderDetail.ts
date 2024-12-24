export interface OrderDetail {
  id: number | null; // Giá trị có thể là null
  skuId: number;
  quantity: number;
  price: number;
  totalMoney: number;
}
