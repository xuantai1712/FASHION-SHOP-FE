import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailsService } from '../../services/order-detail/order-details.service';
import {CommonModule, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  templateUrl: './order-details.component.html',
  imports: [
    CurrencyPipe,
    CommonModule
  ],
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: any;

  constructor(
    private route: ActivatedRoute,
    private orderDetailsService: OrderDetailsService
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    const orderId = +this.route.snapshot.paramMap.get('orderId');  // Lấy orderId từ URL

    this.orderDetailsService.getOrderDetailsByOrderId(orderId).subscribe(
      data => {
        this.orderDetails = data;  // Gán dữ liệu nhận được vào biến orderDetails
      },
      error => {
        console.error('Error loading order details:', error);
      }
    );
  }
}
