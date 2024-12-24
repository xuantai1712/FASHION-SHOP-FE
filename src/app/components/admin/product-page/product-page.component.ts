import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProductService} from '../service/Service/Product/product.service';
import {ProductResponse} from '../Models/ProductResponse';
import {Product} from '../Models/product';
import {RouterLink} from '@angular/router';
import {Router} from '@angular/router';
import {Color} from '../Models/Color';
import {Size} from '../Models/Size';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  standalone: true
})
export class ProductPageComponent implements OnInit {
  searchTimeout?: any;
  totalPages? : number
  listProduct?: Product[];
  page : number = 0
  keyword? : string = '';
  colors: Color[] = [];
  showSuccessMessage: boolean = false;
  message: string = ""

  constructor(
    private productService: ProductService ,
    private router: Router,
              ) {}
 ngOnInit() {
  this.loadProducts()

 }
  // Phương thức load sản phẩm với các tham số lọc
  loadProducts(keyword: string = '', page: number = 0) {
    this.productService.getAllProducts(keyword, page).subscribe((dataProduct: ProductResponse) => {
      if (dataProduct && Array.isArray(dataProduct.products)) {
        this.listProduct = dataProduct.products;
        this.totalPages = dataProduct.totalPages;
      }
    }, error => {
      console.error('Lỗi khi gọi API:', error);
    });
  }

  // Phương thức tìm kiếm sản phẩm
  searchProducts(event: any) {
    const keyword = event.target.value;  // Lấy từ khóa tìm kiếm
    // Xóa timeout cũ nếu người dùng nhập tiếp
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Đặt timeout mới
    this.searchTimeout = setTimeout(() => {
      this.page = 0;  // Đặt lại trang về trang đầu tiên khi tìm kiếm
      this.keyword = keyword;  // Cập nhật từ khóa tìm kiếm
      console.log('Từ khóa tìm kiếm:', keyword);  // Log từ khóa (nếu cần)
      this.loadProducts(keyword, this.page);  // Gọi hàm load sản phẩm
    }, 1000);
  }

  // Tổng số trang
  get totalPagesArray(): number[] {
    const pages = [];
    for (let i = 0; i < (this.totalPages || 1); i++) {
      pages.push(i);
    }
    return pages;
  }

  // Thay đổi trang
  changePage(page: number) {
    if (page >= 0 && page < (this.totalPages || 1)) {
      this.page = page;
      this.loadProducts(this.keyword, this.page);  // Gọi lại load sản phẩm với từ khóa tìm kiếm và trang mới
    }
  }

  // Chuyển đến trang trước
  previousPage() {
    if (this.page > 0) {
      this.page--;  // Giảm số trang
      this.loadProducts(this.keyword, this.page);  // Gọi lại load sản phẩm với từ khóa và trang mới
    }
  }

  // Chuyển đến trang sau

  nextPage() {
    if (this.page < (this.totalPages || 1) - 1) {
      this.page++;  // Tăng số trang
      this.loadProducts(this.keyword, this.page);  // Gọi lại load sản phẩm với từ khóa và trang mới
    }
  }


  getUniqueColors(skus: any[]): any[] {
    const uniqueColors = new Map();
    skus.forEach(sku => {
      uniqueColors.set(sku.color.value_img, sku.color);
    });
    return Array.from(uniqueColors.values());
  }

  getUniqueSizes(skus: any[]): any[] {
    const uniqueSizes = new Map();
    skus.forEach(sku => {
      uniqueSizes.set(sku.size.name, sku.size);
    });
    return Array.from(uniqueSizes.values());
  }


  viewDetails(productId: number, skuId: number) {
    // Điều hướng sang trang chi tiết sản phẩm
    this.router.navigate(['/admin/edit', productId, skuId]).then(() => {
      console.log(productId,skuId);




      // Gọi API để lấy thông tin SKU sau khi điều hướng thành công
      // this.http.get(`/api/skudetails/${skuId}`).subscribe(
      //   (response) => {
      //     console.log('SKU Details:', response);
      //     // Thực hiện logic hiển thị thông tin SKU ở đây
      //   },
      //   (error) => {
      //     console.error('Error fetching SKU details:', error);
      //   }
      // );
    });
  }
  deleteSku(productId: number, skuId: number) {
    this.productService.deleteSku(productId, skuId).subscribe(
      (response) => {
        this.message = "Xóa thành công"
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 1000);
       this.loadProducts(this.keyword, this.page);
      },
      (error) => {
        if (error.status === 404) {
          console.error('Not Found: SKU could not be found.');
        } else if (error.status === 500) {
          console.error('Server Error: Something went wrong on the server.');
        } else {
          console.error('Unexpected error:', error);
        }
      }
    );
  }
}
