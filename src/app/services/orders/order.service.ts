import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from '../../model/order/order';

import {environment} from '../../../environments/environment';
import {Address} from 'node:cluster';
import {OrderDTO} from '../../model/order/OrderDTO';
import {OrderDetail} from '../../model/order/OrderDetail';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/api/v1/orders`;

  constructor(private http: HttpClient) { }


  createOrder(userId: number, orderDTO: {
    phoneNumber: number;
    is_active: boolean;
    QR_code: string;
    shipping_method: string;
    orderDetail: OrderDetail[] | undefined;
    shipping_address: string;
    total_money: number;
    payment_method: string;
    status: string
  }): Observable<OrderDTO> {
    return this.http.post<OrderDTO>(`${this.apiUrl}/create-from-cart/${userId}`,orderDTO);
  }

  getOrdersByUserId(userId: number): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(`${this.apiUrl}/user/${userId}`);
  }






}
