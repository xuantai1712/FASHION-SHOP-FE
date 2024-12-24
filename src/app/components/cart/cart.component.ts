import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { CartResponse } from '../../model/cart/CartResponse';
import { CartItem } from '../../model/cart/CartItem';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../services/token/token.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { CartItemResponse } from '../../responses/cart/cart.response';
import {OrderDetail} from '../../model/order/OrderDetail';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-cart',
  standalone: true,
    imports: [RouterLink, CommonModule, FormsModule, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  userID: number = 0;
  showSuccessMessage: boolean = false;
  message: string = "";
  totalPrice: number = 0;
  totalQty: number = 0;
  listCartResponse?: CartResponse;
  listCartItem?: CartItemResponse[];
  listOrderDetail? : OrderDetail[];


  constructor(
    private cartService: CartService,
    private router: Router,
    private tokenService: TokenService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.userID = this.tokenService.getUserId();
    if (this.userID) {
      this.loadCart(this.userID);
    } else {
      this.loadGuestCart();
    }
  }

  // Update product quantity in the cart
  updateQty(cartId: number | null, qty: number, skuId?: number): void {
    if (this.userID) {
      // Đối với người dùng đã đăng nhập
      this.cartService.updateQty(cartId, qty).subscribe({
        next: () => {
          console.log('Quantity updated via API');
          this.loadCart(this.userID);
          location.reload();// Reload cart data from API
        },
        error: (err) => {
          console.error('Error updating quantity via API:', err);
        }
      });
    } else {
      // Đối với khách (localStorage)
      const guestCart = this.cartService.getCartFromLocalStorage();

      if (skuId) {
        // Cập nhật số lượng trong localStorage
        const updatedCart = guestCart.map(item =>
          item.skuId === skuId ? { ...item, quantity: qty } : item
        );

        // Lưu lại localStorage và cập nhật trạng thái giỏ hàng
        this.cartService.updateCartInLocalStorage(updatedCart);
        this.loadGuestCart(); // Reload guest cart
      }
    }
  }

  // Load cart data from API for logged-in user
  loadCart(userid: number): void {
    this.totalPrice = 0;
    this.totalQty = 0;

    this.cartService.getDataCart(userid).subscribe((dataCart: CartResponse) => {
      this.listCartResponse = dataCart;
      this.listCartItem = dataCart.cartItem;
      this.getDetailOrder();
      dataCart.cartItem.forEach(item => {
        this.totalPrice += item.price * item.quantity;
        this.totalQty += item.quantity;
      });
    });
  }

  // Load guest cart from
  loadGuestCart(): void {
    const guestCart = this.cartService.getCartFromLocalStorage();
    this.totalPrice = 0;
    this.totalQty = 0;

    if (guestCart && guestCart.length > 0) {
      this.cartService.getGuestCart(guestCart).subscribe({
        next: (data: CartItemResponse[]) => {
          console.log('Guest cart response:', data);
          this.listCartItem = data;
          data.forEach(item => {
            this.totalPrice += item.price * item.quantity;
            this.totalQty += item.quantity;
          });
        },
        error: (err) => {
          console.error('Error loading guest cart:', err);
        }
      });
    } else {
      console.log('No items in guest cart.');
    }
  }

  // Decrease quantity of a product in the cart
  activeMinus(cartItem: CartItemResponse) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;

      if (!this.userID) {
        // Cập nhật trong localStorage
        this.updateQty(null, cartItem.quantity, cartItem.skuResponse.id);
      } else {
        // Cập nhật qua API

        this.updateQty(cartItem.id, cartItem.quantity);
      }
    } else {
      // Xóa sản phẩm khi số lượng bằng 1
      if (!this.userID) {
        this.removeItemFromLocalStorage(cartItem.skuResponse.id);
      } else {
        this.removeItem(cartItem.id); // Xóa qua API
      }
    }
  }


  activeAdd(cartItem: CartItemResponse) {
    cartItem.quantity++;

    if (!this.userID) {
      // Cập nhật localStorage
      this.updateQty(null, cartItem.quantity, cartItem.skuResponse.id);
    } else {
      // Cập nhật qua API
      this.updateQty(cartItem.id, cartItem.quantity);
    }
  }

  removeItem(cartId?: number | null, cartItem?: CartItemResponse) {

    if (this.userID && cartId) {
      // Xóa qua API nếu đã đăng nhập
      this.cartService.removeItem(cartId).subscribe({
        next: () => {
          this.loadCart(this.userID); // Làm mới giỏ hàng sau khi xóa
        },
        error: (err) => {
          console.error("Error removing item from cart", err);
        }
      });
    } else if (cartItem && cartItem.skuResponse.id) {
      // Xóa trong localStorage nếu không đăng nhập
      this.removeItemFromLocalStorage(cartItem.skuResponse.id);
    }
    window.location.reload();
  }
  removeItemFromLocalStorage(skuId: number | undefined): void {
    const guestCart = this.cartService.getCartFromLocalStorage();

    // Lọc bỏ phần tử cần xóa
    const updatedCart = guestCart.filter(item => item.skuId !== skuId);

    // Lưu lại danh sách mới vào localStorage
    this.cartService.removeFromLocalStorage(updatedCart);

    // Cập nhật listCartItem và tổng số lượng, giá
    this.listCartItem = this.listCartItem?.filter(item => item.skuResponse.id !== skuId);
    this.totalPrice = 0;
    this.totalQty = 0;

    this.listCartItem?.forEach(item => {
      this.totalPrice += item.price * item.quantity;
      this.totalQty += item.quantity;
    });

    // Nếu giỏ hàng trống, xử lý trường hợp này
    if (this.listCartItem?.length === 0) {
      console.log('Giỏ hàng trống.');
      this.listCartItem = [];
    }
  }

  getDetailOrder(): void {
    if (this.listCartItem == null || this.listCartItem.length === 0) {
      console.log("null or empty cart");
    } else {

      this.listCartItem.forEach((item: CartItemResponse) => {
        if (item.skuResponse && item.skuResponse.id && item.quantity && item.price) {
          const listOrderDetail: { quantity: number; price: number; totalMoney: number; skuId: number } = {
            skuId: item.skuResponse.id,
            quantity: item.quantity,
            price: item.price,
            totalMoney: item.quantity * item.price,
          };
          if (!this.listOrderDetail) {
            this.listOrderDetail = [];
          }

          // Thêm vào listOrderDetail
          this.listOrderDetail.push(<OrderDetail>listOrderDetail);
        } else {
        }
      });
    }
  }

  protected readonly JSON = JSON;
}
