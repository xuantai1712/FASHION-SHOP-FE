import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AddressService} from '../../services/address/address.service';
import {OrderService} from '../../services/orders/order.service';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';

import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {Order} from '../../model/order/order';
import {User} from '../../model/order/user';
import {OrderDetail} from '../../model/order/OrderDetail';
import {CartItem} from '../../model/cart/CartItem';
import { HttpErrorResponse } from '@angular/common/http';
import {TokenService} from '../../services/token/token.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit {
  isOrderCreated = false; // Biến để điều khiển hiển thị modal
  orderOK: any ;


  userId: number = 0;
  order: Order | null = null;
  list: any[] = []

  totalPrice: number = 0
  totalQty: number = 0
  totalOrder: number = 0

  listOrder?: Order[];
  orderAdd?: Order
  userList?: User
  indexPayment: number =  1
  selectPaymentMethod: string = ""
  orderDetail? : OrderDetail[]
  selectedDeliveryMethod: string = "1"; // Giá trị mặc định
  deliveryFee: number = 0;
  constructor(
    private addressService: AddressService,
    private orderService: OrderService,
    private router: ActivatedRoute,
    private tokenService: TokenService,
    private route: Router,

  ) { this.updateDeliveryFee() }






  ngOnInit() {
  this.userId = this.tokenService.getUserId();

    this.loadAddressByUserId(this.userId)
    this.router.queryParams.subscribe(params => {
      const cartItemParam = params['cartItem'];

      if (cartItemParam) {  // Kiểm tra xem cartItem có tồn tại không
        try {
          this.orderDetail = JSON.parse(cartItemParam);
          this.orderDetail?.forEach(item => {
            this.totalPrice += item.price * item.quantity;
            this.totalQty += item.quantity;
          });
        } catch (error) {
          console.error('Lỗi phân tích JSON:', error);
        }
      } else {
        console.warn('cartItem không tồn tại ');
      }

      //     this.router.queryParams.subscribe(params => {
//       this.orderDetail = JSON.parse(params['cartItem']);
//       this.orderDetail?.forEach(item => {
//         this.totalPrice += item.price * item.quantity
//         this.totalQty += item.quantity
//       })
//     });
// console.log(this.orderDetail)

    });

  }



  updateDeliveryFee(): void {
    // So sánh đúng với giá trị chuỗi "1" và "2"

    if (this.selectedDeliveryMethod === "1") {
      this.deliveryFee = 20000; // Phí  "Giao hàng nhanh"
      console.log("selectedDeliveryMethod: " + this.deliveryFee);
    } else if (this.selectedDeliveryMethod === "2") {
      this.deliveryFee = 50000; // Phí "Giao hàng hỏa tốc"
      console.log("selectedDeliveryMethod: " + this.deliveryFee);
    }else if (this.selectedDeliveryMethod === "3") {
      this.deliveryFee = 0;
      console.log("selectedDeliveryMethod: " + this.deliveryFee);
    }

  }

  getPaymentMethod(): void {
    // this.selectPaymentMethod = ""
    // this.selectPaymentMethod

    if (this.indexPayment == 1) {
      this.selectPaymentMethod = "Thanh toán khi nhận hàng "
    } else if (this.indexPayment == 2) {
      this.selectPaymentMethod = "VNPAY"
    }
    console.log("getPaymentMethod: " + this.selectPaymentMethod)

  }
  createOrder(order: Order | undefined): void {

;
    // DTO để gửi lên API
    const orderDTO = {
      phoneNumber: this.tokenService.getUserId(),
      // Danh sách chi tiết đơn hàng
      shipping_address: `${order?.street || ''} ${order?.ward || ''} ${order?.city}`,
      total_money: this.totalPrice,
      status: 'Pending',
      QR_code: '',
      is_active: true,
      payment_method: this.selectPaymentMethod,
      shipping_method: this.selectedDeliveryMethod,
      orderDetail: this.orderDetail,
    };


    this.orderService.createOrder(this.userId, orderDTO).subscribe({
      next: (response) => {

        this.orderOK = response; // Lưu thông tin đơn hàng trả về từ API
        this.isOrderCreated = true; // Hiển thị modal

        console.log('Order created successfully:', response);

      },
      error: (error) => {
        console.error('Error creating order:', error);
      }
    });

    console.log('Order DTO:', orderDTO);
  }


  setDefault(order: Order): void {
    this.userId = this.tokenService.getUserId();
    this.addressService.setDefaultAddress(order.id).subscribe({
      next: (response) => {

        this.loadAddressByUserId(this.userId); // Làm mới danh sách địa chỉ sau khi cập nhật
        console.log("set default: "+ this.userId)
      },
      error: (error : HttpErrorResponse) => {
        console.error('Error setting default address:', error.message);
        console.error('Full error:', error);
      }
    });
  }

  loadAddressByUserId(userId: number): void {
    this.addressService.getAddressesByUserId(this.userId).subscribe((dataOrder: Order[]) => {
      this.listOrder = dataOrder
      dataOrder.forEach((item: Order) => {
        this.orderAdd = item
      })
      dataOrder.forEach(address => {
        this.userList = address.user
      })
    })
  }

  closeModal() {
    this.isOrderCreated = false;  // Đóng modal khi người dùng nhấn Đóng
  }




    }
