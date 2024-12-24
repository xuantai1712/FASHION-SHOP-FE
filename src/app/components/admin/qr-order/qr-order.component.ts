import {Component, OnInit} from '@angular/core';
import { Order } from '../Models/orderQR.model';
import {ActivatedRoute} from '@angular/router';
import {OrderQrService} from '../service/Service/order-qr/order-qr.service';
import {CurrencyPipe, NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-qr-order',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgIf,
    NgForOf,
    NgOptimizedImage,
    FormsModule,
    TitleCasePipe
  ],
  templateUrl: './qr-order.component.html',
  styleUrl: './qr-order.component.scss'
})
export class QrOrderComponent implements OnInit{
  orderId: number = 0;
  order: Order | null = null;
  selectedStatus: string = '';
  statuses: string[] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  constructor(
    private route: ActivatedRoute,
    private orderQRService: OrderQrService
  ) {}

  ngOnInit(): void {
    // Lấy orderId từ query parameters
    this.route.queryParamMap.subscribe(params => {
      const orderIdParam = params.get('orderId');
      if (orderIdParam) {
        this.orderId = +orderIdParam; // Chuyển đổi orderId thành number
        this.getOrderDetails();
      }
    });
  }
  // Lấy chi tiết đơn hàng
  getOrderDetails(): void {
    this.orderQRService.getOrderQR(this.orderId).subscribe((data) => {
      this.order = data;
    });
  }

  changeOrderStatus(): void {
    if (this.order && this.selectedStatus !== this.order.status) {
      const updatedOrder = { ...this.order, status: this.selectedStatus };
      this.orderQRService.updateOrderStatus(this.orderId, updatedOrder).subscribe(
        () => {
          if (this.order) {
            this.order.status = this.selectedStatus;
          }
          alert(`Order status has been updated to ${this.selectedStatus}!`);
        },
        (error) => {
          alert('Error updating order status.');
        }
      );
    }
  }


}
