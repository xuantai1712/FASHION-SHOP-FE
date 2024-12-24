import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../../Models/orderQR.model';
import {environment} from '../../../../../../environments/environment'; // Đảm bảo import model đúng đường dẫn

@Injectable({
  providedIn: 'root'
})
export class OrderQrService {
  private apiUrl = `${environment.apiBaseUrl}/api/v1/orders/QR`;
  constructor(private http: HttpClient) { }

  getOrderQR(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  updateOrderStatus(orderId: number, updatedOrder: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${orderId}/status`, updatedOrder);  // API PUT để thay đổi trạng thái
  }

}
