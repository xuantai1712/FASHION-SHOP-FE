import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailsService } from '../../services/order-detail/order-details.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { OrderService } from '../../services/orders/order.service';
import { OrderDetail } from '../../model/order/OrderDetail';
import { OrderDetailProfile } from '../../model/order_detail_profile/order_detail_Profile';
import { SkuResponse } from '../../model/cart/SkuResponse';
import { Size } from '../../model/sizes';
import { Color } from '../../model/color';
import { OrderDetailsResponse } from '../../model/order_detail_profile/OrderDetailsResponse';
import { FormsModule } from '@angular/forms';
import {OrderDetailResult} from '../../model/order_detail_profile/OrderDetailResult';


@Component({
  selector: 'app-order-details',
  standalone: true,
  templateUrl: './order-details.component.html',
  imports: [
    CurrencyPipe,
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: any;
  listOrderDetailResult: OrderDetailResult[] = [];
  result: any[] = [];
  listOrderDetailProfile?: OrderDetailProfile;
  listOrderDetailsRespons?: OrderDetailsResponse[];
  listSkuResponse?: SkuResponse[];
  listSize?: Size;
  listColor?: Color;

  constructor(
    private route: ActivatedRoute,
    private orderDetailsService: OrderDetailsService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    const orderId = +this.route.snapshot.paramMap.get('orderId');

    console.log("orderId: " + orderId);
    this.loadOrderDetails(orderId);


  }

  loadOrderDetails(orderId: number): void {
    this.orderDetailsService.getOrderDetailsByOrderId(orderId).subscribe((dataOrderDetails: OrderDetailProfile) => {
      this.listOrderDetailProfile = dataOrderDetails;
      this.listOrderDetailsRespons = dataOrderDetails.orderdetailsResponses;

      this.listOrderDetailResult = [];

      // Chuyển đổi `create_at` thành chuỗi
      if (this.listOrderDetailProfile?.create_at) {
        //@ts-ignore
        this.listOrderDetailProfile.create_at = this.convertCreateAt(this.listOrderDetailProfile.create_at);
      }

      this.listOrderDetailsRespons?.forEach(orderDetail => {
        orderDetail.skus.forEach(sku => {
          const colorId = sku.color.id;

          // Lấy hình ảnh từ `profileProductReponse.productImages` dựa trên `colorId`
          const productImage = this.getProductImageByColorId(colorId);

          const item = {
            idcolor: sku.color.id,
            colorname: sku.color.name,
            idsize: sku.size.id,
            sizename: sku.size.name,
            quantity: orderDetail.quantity,
            price: orderDetail.price,
            totalMoney: orderDetail.totalMoney,
            productName: orderDetail.productName,
            image: productImage  // Thêm hình ảnh vào item
          };
          //@ts-ignore
          this.listOrderDetailResult.push(item);  // Thêm kết quả vào danh sách
        });
      });

      console.log("List Order Detail Result: ", this.listOrderDetailResult);
    }, error => {
      console.log("Error fetching order details:", error);
    });
  }

// Hàm tìm hình ảnh dựa trên `colorId`
  getProductImageByColorId(colorId: number): string | undefined {
    const productImages = this.listOrderDetailProfile?.profileProductReponse.productImages;
    const image = productImages?.find(img => img.colorId === colorId);

    // Nếu tìm thấy, trả về URL của hình ảnh, nếu không trả về `undefined`
    return image ? image.imageUrl : undefined;
  }




  convertCreateAt(createAt: number[]): string {
    const date = new Date(Date.UTC(createAt[0], createAt[1] - 1, createAt[2], createAt[3], createAt[4], createAt[5], createAt[6] / 1000000));
    return date.toLocaleString();  // Định dạng ngày theo múi giờ của trình duyệt
  }


}
