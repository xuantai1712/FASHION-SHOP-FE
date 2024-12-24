import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, throwError, catchError } from 'rxjs';
import { CartResponse } from '../../model/cart/CartResponse';
import { CartItem } from '../../model/cart/CartItem';
import { CartItemResponse } from '../../responses/cart/cart.response';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private urlApi = `${environment.apiBaseUrl}/api/v1`;
  private cartSubject = new BehaviorSubject<any[]>(this.getCartFromLocalStorage());
  cart$ = this.cartSubject.asObservable();
  private cartQuantitySubject = new BehaviorSubject<number>(0);
  cartQuantity$ = this.cartQuantitySubject.asObservable()

  private cartUserSubject = new BehaviorSubject<CartItem[]>([]);  // Holds current cart state
  cartUser$ = this.cartUserSubject.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  getDataCart(idUser: number): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.urlApi}/cart?userId=${idUser}`);
  }

  addToCart(userId: number, cartDTO: { quantity: number; skuId: number | undefined }): Observable<any> {
    return this.http.post(`${this.urlApi}/cart?userId=${userId}`, cartDTO);
  }

  getTotalItemUrl(idUser: number): Observable<any> {
    const params = new HttpParams().set('userId', idUser.toString());  // Chuyển userId thành string
    return this.http.get<any>(`${this.urlApi}/cart/totalItem`, { params });
  }

  updateQty(cartId: number | null, qtyNew: number): Observable<ArrayBuffer> {
    return this.http.put<ArrayBuffer>(`${this.urlApi}/cart?cartId=${cartId}&newQuantity=${qtyNew}`, {}).pipe(
      catchError((error) => {
        console.error('Lỗi khi cập nhật số lượng:', error);
        return throwError(() => new Error('Không thể cập nhật số lượng!'));
      })
    );
  }

  removeItem(cartId: number): Observable<void> {
    const params = new HttpParams().set('cartId', cartId.toString());
    return this.http.delete<void>(`${this.urlApi}/cart`, { params });
  }

  updateCartUser(cartItems: CartItem[]): void {
    this.cartUserSubject.next(cartItems);
  }



  getGuestCart(cartItems: CartItem[]): Observable<CartItemResponse[]> {
    return this.http.post<CartItemResponse[]>(`${this.urlApi}/cart/guest`, cartItems);
  }

  // Lấy giỏ hàng từ localStorage (chỉ khi đang ở trình duyệt)
  getCartFromLocalStorage(): any[] {
    if (isPlatformBrowser(this.platformId)) {
      const cart = localStorage.getItem('guestCart');
      return cart ? JSON.parse(cart) : [];
    }
    return []; // Trả về giỏ hàng trống nếu không ở trình duyệt
  }

  // Thêm item vào localStorage (chỉ khi ở trình duyệt)
  addToLocalStorage(cartItem: { skuId: number | undefined, quantity: number }): void {
    if (isPlatformBrowser(this.platformId)) {
      let currentCart = this.getCartFromLocalStorage();

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingItem = currentCart.find(item => item.skuId === cartItem.skuId);

      if (existingItem) {
        // Nếu sản phẩm đã có, chỉ cần tăng số lượng
        existingItem.quantity += cartItem.quantity;
      } else {
        // Nếu chưa có sản phẩm trong giỏ hàng, thêm mới vào giỏ
        currentCart.push(cartItem);
      }

      // Lưu lại giỏ hàng vào localStorage
      localStorage.setItem('guestCart', JSON.stringify(currentCart));

      // Cập nhật lại cartSubject để thông báo thay đổi
      this.cartSubject.next(currentCart);
    }
  }

  // Xóa item khỏi localStorage
  removeFromLocalStorage(updatedCart: any[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('guestCart', JSON.stringify(updatedCart));

      // Cập nhật lại BehaviorSubject để thông báo thay đổi
      this.cartSubject.next(updatedCart);
    }
  }

  updateCartInLocalStorage(cart: any[]): void {
    localStorage.setItem('guestCart', JSON.stringify(cart));
    this.updateCartQuantity(); // Phát sự kiện cập nhật quantity
    this.cartSubject.next(cart);
  }

  updateCartQuantity(): void {
    const totalQuantity = this.calculateTotalQuantityFromLocalStorage();
    this.cartQuantitySubject.next(totalQuantity); // Thông báo thay đổi

  }

  calculateTotalQuantityFromLocalStorage(): number {
    const cart = this.getCartFromLocalStorage();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }




}
