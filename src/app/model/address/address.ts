import {User} from './user';

export interface Address {
  id?: number;
  city: string;
  ward: string;
  street: string;
  isDefault: boolean;
  user: User;
}

