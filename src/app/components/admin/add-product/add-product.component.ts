import {Component, OnInit} from '@angular/core';
import {Category} from '../Models/Category';
import {CategoryService} from '../service/Service/Category/category.service';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Color} from '../Models/Color';
import {ColorService} from '../service/Service/Color/color-service.service';
import {ProductService} from '../service/Service/Product/product.service';
import {Size} from '../Models/Size';
import {SizeService} from '../service/Service/Size/size-service.service';
import {Product} from '../Models/product';
import {SKU} from '../Models/SKU';
import {ProductImage} from '../Models/ProductImage';
import {SkuService} from '../service/Service/Sku/sku-service.service';
import {ActivatedRoute} from '@angular/router';
// import {SubCategory} from '../Models/SubCategory';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule,NgForOf,NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  selectedColor: Color = {id: 1, name: 'Default Color', value_img: 'default-image-url'};
  selectedSize: Size = {id: 1, name: 'Default Size'};
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
  showSuccessMessage: boolean = false;
  message: string = ""

  // Khởi tạo SKU rỗng
  // @ts-ignore
  sku: SKU = {
    id: 0,
    qtyInStock: 0,
    originalPrice: 0,
    salePrice: 0,
    color: this.selectedColor,
    size: this.selectedSize
  };
  categories: Category[] = [];
  colors: Color[] = [];
  sizes: Size[] = [];
  // @ts-ignore
  dropdownOpen = false;
  private skuId: Number | undefined;
  private productId: Number | undefined;
  imagePreviews: string[] = [];
  selectedFiles = [];
  protected isCreateMode: boolean | undefined;
  selectedCategory?: number;
  selectedSubCategory: number | null = null;
  selectedSubSubCategory: number | null = null;

  // Danh sách con
  selectedSubCategories: Category[] = [];
  selectedSubSubCategories: Category[] = [];





  constructor(
    private categoryService: CategoryService,
    private colorService: ColorService,
    private productService: ProductService,
    private sizeService: SizeService,
    private skuService: SkuService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // Lấy danh sách danh mục
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        console.log(data)
        this.findCategoryByIdToShow(3);

      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );

    // Lấy danh sách màu
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
        if (!this.sku.size || !this.sku.size.id) {
          this.sku.size = this.sizes[0]; // Gán size mặc định nếu chưa có
        }
      },
      (error) => {
        console.error('Error fetching sizes:', error);
      }
    );



    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.skuId = Number(this.route.snapshot.paramMap.get('skuId'));
    if (this.skuId) {
      this.isCreateMode = false;
      // @ts-ignore
      this.skuService.getDetailsSku(this.productId, this.skuId).subscribe((productId: Product) => {
        this.product = productId;
        console.log(this.product);
        if (this.product.skus && this.product.skus.length > 0) {

          // Lấy SKU đầu tiên trong danh sách skus
          const sku = this.product.skus[0];

          // Cập nhật màu sắc đã chọn
          this.selectedColor = this.colors.find(color => color.id === this.product.skus[0].color.id) || this.selectedColor;

          // Cập nhật kích thước đã chọn
          this.selectedSize = this.sizes.find(size => size.id === sku.size.id) || this.selectedSize;





          // Cập nhật thông tin SKU vào sku hiện tại
          this.sku = sku;
        }
      }, error => {
        console.error('Lỗi khi gọi API:', error);
      });
    } else {
      this.isCreateMode = true;
    }


  }
  findCategoryByIdToShow(categoryId: number): void {
    // Tìm category có id = categoryId (ví dụ: 3)
    const category = this.categories.find(cat => cat.id === categoryId);

    if (category) {
      // Nếu tìm thấy category, ta log thông tin category và subCategories
      console.log("Found category:", category);
      console.log("Subcategories of this category:", category.subCategories);

      // Cập nhật selectedCategory và selectedSubCategories
      this.selectedCategory = category.id; // Gán id của category đã chọn
      this.selectedSubCategories = category.subCategories || []; // Gán danh sách subcategories
    } else {
      // Nếu không tìm thấy category với id = 3
      console.log("Category with id", categoryId, "not found.");
    }
  }


// @ts-ignore
  onCategoryChange() {
    //@ts-ignore
    const selectedCategoryId = +this.selectedCategory; // Ép kiểu về number
    for (const category of this.categories) {
      console.log("Listcaaaaaaaaaaa: " + category.id);
      if (selectedCategoryId === category.id) {
        console.log("Selected: " + category.id);
        console.log("selectedCategory: " + this.selectedCategory);
        this.selectedSubCategories = category.subCategories || [];
        return; // Thoát khỏi hàm sau khi tìm thấy
      }
    }

    // Nếu không tìm thấy category phù hợp
    this.selectedSubCategories = [];
    console.log("No category found with ID:", this.selectedCategory);
  }


  onSubCategoryChange() {
    // Ép kiểu selectedSubCategory về number để so sánh
    //@ts-ignore
    const selectedSubCategoryId = +this.selectedSubCategory;

    for (const subCategory of this.selectedSubCategories) {
      console.log("SubCategory ID: " + subCategory.id);
      if (selectedSubCategoryId === subCategory.id) {
        console.log("Selected SubCategory: " + subCategory.id);
        this.selectedSubSubCategories = subCategory.subCategories || [];
        this.selectedSubSubCategory = null; // Reset lựa chọn subsubcategory
        return; // Thoát khỏi hàm sau khi tìm thấy
      }
    }

    // Nếu không tìm thấy subcategory phù hợp
    this.selectedSubSubCategories = [];
    this.selectedSubSubCategory = null; // Reset lựa chọn subsubcategory
    console.log("No SubCategory found with ID:", this.selectedSubCategory);
  }









  // Hàm tìm category theo ID
  findCategoryById(categoryId: number, categories: any[]): any {
    for (let category of categories) {
      if (category.id === categoryId) {
        return category;
      }
      if (category.subCategories?.length) {
        const subCategory = this.findCategoryById(categoryId, category.subCategories);
        if (subCategory) return subCategory;
      }
    }
    return null;
  }



  // Khi người dùng chọn ảnh
  onFilesSelected(event: any): void {
    const files: FileList = event.target.files;
    // Duyệt qua các file được chọn
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name; // Lấy tên file từ FileList
      // @ts-ignore
      this.selectedFiles.push(fileName);
      // Tạo preview ảnh để hiển thị trong UI
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviews.push(e.target?.result as string);
      };
      reader.readAsDataURL(files[i]);
    }
  }






  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Khi người dùng chọn màu
  selectColor(color: Color): void {
    this.selectedColor = color;
    this.sku.color = color;
    this.dropdownOpen = false;
  }

  // Khi người dùng chọn size
  selectSize(size: Size): void {
    this.selectedSize = size;
    this.sku.size = size;
  }

  // Xử lý submit form
  onSubmit(): void {

    // Duyệt qua các preview ảnh và push vào productImages
    for (let i = 0; i < this.imagePreviews.length; i++) {
      const fileName = this.selectedFiles[i];// Tạo tên file duy nhất
      const image: ProductImage = {
        id: 0,
        imageUrl: fileName, // Lưu tên file thay vì URL
        productId: this.product.id,
        colorId: this.selectedColor.id,
        thumbnail: i === 0 // Ảnh đầu tiên sẽ là thumbnail
      };
      this.product.productImages.push(image);
    }

    // Tiến hành gửi dữ liệu lên server hoặc các thao tác khác
    console.log('Product Images:', this.product.productImages);

    // Tiến hành gửi form hoặc các thao tác khác
    // Ví dụ: this.productService.saveProduct(this.product);

    const productData = {
      name: this.product.name,
      description: this.product.description,
      category_id: this.selectedSubSubCategory,
      imgs: this.product.productImages.map(img => ({
        imageUrl: img.imageUrl,
        thumbnail: img.thumbnail,
        color: {id: img.colorId}
      })),
      skus: [{
        qtyInStock: this.sku.qtyInStock,
        originalPrice: this.sku.originalPrice,
        salePrice: this.sku.salePrice,
        color: {id: this.sku.color.id},
        size: {id: this.sku.size.id}
      }]
    };
    console.log('Prepared Product Data:', productData);
    if (this.isCreateMode) {
      this.productService.addProduct(productData).subscribe({
        next: (response) => {
          console.log('Product created successfully:', response);
          // Hiển thị thông báo thành công
          this.message = "Sản phẩm đã được thêm thành công!";
          this.showSuccessMessage = true;
          // Ẩn thông báo sau 3 giây
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        },
        error: (error) => {
          console.error('Error creating product:', error);

          // Xác định lỗi chi tiết nếu có
          let errorMessage = "Đã xảy ra lỗi khi thêm sản phẩm.";
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }

          // Hiển thị thông báo lỗi
          this.message = errorMessage;
          this.showSuccessMessage = true;

          // Ẩn thông báo sau 3 giây
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        },
      });

    }
    else {
      console.log('Product to update:', productData);
      this.productService.updateProduct(productData, this.productId,this.skuId).subscribe(
        (response) => {
          console.log('Product created successfully:', response);
          alert('Sản phẩm đã được thêm thành công!');
        },
        (error) => {
          console.error('Error creating product:', error);
          alert('Đã xảy ra lỗi khi thêm sản phẩm.');
        }
      );
    }

  }

}
