import {Component, OnInit} from '@angular/core';

import {UserService} from '../../services/user/user.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import {User} from '../../model/order/user';
import {Order} from '../../model/order/order';
import {OrderService} from '../../services/orders/order.service';
import {OrderDTO} from '../../model/order/OrderDTO';
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink, CommonModule, FormsModule
  ],
  templateUrl:'./profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  orders: OrderDTO[] = [];

  userId: number = 0;
  userName: string = '';
  userPhone: string = '';
  userEmail: string = '';


  constructor(private userService: UserService,
              private orderService: OrderService,
              private tokenService: TokenService,
              private route: ActivatedRoute,



  ) { }

  ngOnInit(): void {

    this.userId = this.tokenService.getUserId();
    this.loadUserProfile(this.userId);

    this.loadOrderHistory(this.userId);
  }






  loadUserProfile(userId: number): void {
    this.userService.getUserProfile().subscribe(
      (data: User) => {
        this.userName = data.name;
        this.userPhone = data.phone;
        this.userEmail = data.email;
      },
      error => {
        console.error('Lỗi khi tải thông tin người dùng', error);
      }
    );
  }


  loadOrderHistory(userId: number): void {
    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (data: OrderDTO[]) => {
        console.log('Dữ liệu trả về từ API:', data);


        this.orders = data.map(order => ({
          ...order,
          createdAt: new Date(order.createdAt)
        }));


        this.orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        console.log('Dữ liệu đơn hàng sau khi sắp xếp:', this.orders);
      },
      error: (err) => {
        console.error('Lỗi khi tải đơn hàng:', err);
      }
    });
  }



}
