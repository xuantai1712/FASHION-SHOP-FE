import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {SkuService} from '../../Service/Sku/sku-service.service';
import {ProductResponse} from '../../Models/ProductResponse';
import {SKU} from '../../Models/SKU';
import {NgForOf, NgIf} from '@angular/common';
import {Color} from '../../Models/Color';
import {Size} from '../../Models/Size';
import {Product} from '../../Models/product';
import {ColorService} from '../../Service/Color/color-service.service';
import {ProductService} from '../../Service/Product/product.service';
import {SizeService} from '../../Service/Size/size-service.service';

@Component({
  selector: 'app-sku-detail',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './sku-detail.component.html',
  styleUrl: './sku-detail.component.css'
})
export class SkuDetailComponent implements OnInit{
  skuDetails: any = {};
  private skuId : Number | undefined;
  colors: Color[] = [];
  sizes: Size[] = [];
  selectedColor: Color = { id: 1, name: 'Default Color', value_img: 'default-image-url' };
  selectedSize: Size = { id: 1, name: 'Default Size' };
  dropdownOpen = false;
  product: Product = {
    id: 0,
    name: '',
    description: '',
    categoryId: 0,
    skus: [],
    productImages: [],
    create_at: '',
    update_at: ''
  };

  // Khởi tạo SKU rỗng
  sku: SKU = {
    id: 0,
    qtyInStock: 0,
    originalPrice: 0,
    salePrice: 0,
    color: this.selectedColor,
    size: this.selectedSize
  };


  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private skuService: SkuService,
              private colorService: ColorService,
              private productService: ProductService,
              private sizeService: SizeService
              ) {

  }
  ngOnInit(): void {
    this.skuId = Number(this.route.snapshot.paramMap.get('skuId'));
    // @ts-ignore
    this.skuService.getDetailsSku(this.skuId).subscribe((SkuDetails: SKU) => {

        this.skuDetails = SkuDetails;
      console.log(this.skuDetails);


    }, error => {
      console.error('Lỗi khi gọi API:', error);
    });

    this.colorService.getAllColors().subscribe(
      (data: Color[]) => {
        this.colors = data;
      },
      (error) => {
        console.error('Error fetching colors:', error);
      }
    );

    // Lấy danh sách kích thước
    this.sizeService.getAllSize().subscribe(
      (data: Size[]) => {
        this.sizes = data;
      },
      (error) => {
        console.error('Error fetching sizes:', error);
      }
    );


  }

  onSubmit(): void {



  }



  // Khi người dùng chọn màu
  selectColor(color: Color): void {
    this.selectedColor = color;
    this.sku.color = color;
    this.dropdownOpen = false;
  }
  selectSize(size: Size): void {
    this.selectedSize = size;
    this.sku.size = size;
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // goBack(): void {
  //   this.route.navigate(['/sku-list']); // Điều hướng về danh sách SKU
  // }
}
