import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe
  ],
  templateUrl: './orderlist.component.html',
  styleUrl: './orderlist.component.scss'
})
export class OrderlistComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.http.get<any[]>('http://localhost:8080/api/v1/orders/admin')
      .subscribe(data => {
        this.orders = data;
      });
  }

  goToOrderDetails(orderId: number): void {
    // Chuyển hướng đến trang chi tiết với queryParams
    this.router.navigate(['/admin/qr-order'], { queryParams: { orderId } });
  }
}
