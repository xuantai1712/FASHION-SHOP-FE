import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {OrderDetail} from '../../model/order/OrderDetail';
import {OrderDetailProfile} from '../../model/order_detail_profile/order_detail_Profile';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {


  private apiUrl = `${environment.apiBaseUrl}/api/v1/order-details`;

  constructor(private http: HttpClient) { }



  getOrderDetailsByOrderId(orderId: number): Observable<OrderDetailProfile> {
    return this.http.get<OrderDetailProfile>(`${this.apiUrl}/order/${orderId}`);
  }
}
