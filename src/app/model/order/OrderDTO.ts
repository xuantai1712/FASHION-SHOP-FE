import {OrderDetail} from './OrderDetail';

export interface OrderDTO {
  phoneNumber: string;
  orderId: number;
  shipping_address: string;
  total_money: number;
  status: string;
  QR_code: string;
  is_active: boolean | null; // Có thể null
  payment_method: string;
  shipping_method: string;
  createdAt : Date;
  orderDetails: OrderDetail[]; // Danh sách các chi tiết đơn hàng
}
