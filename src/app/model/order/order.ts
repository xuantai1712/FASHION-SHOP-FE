import {User} from './user';


export interface Order {
  id: number; // ID địa chỉ
  city: string; // Thành phố
  ward: string; // Phường
  street: string; // Đường
  isDefault: boolean; // Địa chỉ mặc định hay không
  user: User; // Người dùng liên kết với địa chỉ
}
