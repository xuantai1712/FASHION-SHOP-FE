export interface Color {
  id: number;
  name: string;
  value_img: string | null;
}

export interface Size {
  id: number;
  name: string;
}

export interface OrderDetailItem {
  productName: string;
  quantity: number;
  price: number;
  color: Color;
  size: Size;
  productImage: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: { id: number; name: string };
  is_active: boolean;
  facebook_account_id: string | null;
  google_account_id: string | null;
}

export interface Order {
  id: number;
  user: User;
  shippingAddress: string;
  totalMoney: number;
  shippingMethod: string;
  paymentMethod: string;
  status: string;
  orderDetailItems: OrderDetailItem[];
}
