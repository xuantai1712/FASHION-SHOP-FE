import {ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {isPlatformBrowser, NgForOf} from '@angular/common';
import { CommonModule } from '@angular/common';
import {CategoryService} from '../../services/category/category.service';
import {Category} from '../../model/category';
import {Product} from '../../model/product';
import {ProductsList} from '../../model/Products';
import {ProductService} from '../../services/product/product.service';
import {TokenService} from '../../services/token/token.service';
import {UserService} from '../../services/user/user.service';
import {UserResponse} from '../../responses/user/user.response';
import { CartService } from '../../services/cart/cart.service';
import {Subscription} from 'rxjs';
import {CartItem} from '../../model/cart/CartItem';
import {CartResponse} from '../../model/cart/CartResponse';
import {TranslatePipe} from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgForOf, CommonModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categoryList: Category[] = [];
  totalItems: number = 0
  products?: Product[];
  totalPages?: number;
  userResponse?: UserResponse | null;
  isPopoverOpen = false;
  activeNavItem: number = 0;
  isLoggedIn: boolean = false;
  userId: number = 0;
  private cartSubscription: Subscription = new Subscription();

  cartItems: CartItem[] = [];
  cartQuantity: number = 0;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private translate: TranslateService,
    private cartService: CartService, @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.translate.setDefaultLang('vi');
  }



  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();

    this.translate.setDefaultLang('vi');
    this.tokenService.checkLoginStatus();  // Check login status and sync
    this.tokenService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status; // Update login status

      if (this.isLoggedIn) {
        this.loadUserCart(this.userId);// Fetch user cart from the server
      } else {
        this.loadGuestCart(); // Load guest cart from localStorage if not logged in
      }
    });


    this.cartSubscription = this.cartService.cart$.subscribe((cart) => {
      this.totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // Calculate total items in cart
      this.cartQuantity = this.totalItems;
    });

    this.cartService.cartUser$.subscribe((cartItems: CartItem[]) => {
      if (this.isLoggedIn) {
        this.cartItems = cartItems;
        this.cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
      }
    });

    // Fetch categories and user data
    this.getCategoryAll();
    this.updateCartTotal();
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }


  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }
  loadUserCart(userId: number): void {
    this.cartService.getDataCart(userId).subscribe((data: CartResponse) => {
      this.cartService.updateCartUser(data.cartItem); // Update cart with fetched items
    });
  }

  loadGuestCart(): void {
    // Load guest cart logic here (from localStorage)
    const guestCart = this.cartService.getCartFromLocalStorage();
    this.cartService.updateCartUser(guestCart); // Update cart for guest user
  }

  getCategoryAll(): void {
    this.categoryService.getCategoryAll().subscribe((allCategory: Category[]) => {
      this.categoryList = allCategory;
    })
  }


  onCategorySelect(id: number): void {
    this.categoryService.setCategoryId(id);

  }

  getTotalItems(userId: number): void {
    this.cartService.getTotalItemUrl(userId).subscribe(response => {
      // Lấy số totalItem từ API và gán vào biến totalItem
      this.totalItems = response.totalItem;
    }, error => {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
    });
  }

  handleItemClick(index: number): void {
    //alert(`Clicked on "${index}"`);
    if (index === 0) {
      debugger
      this.router.navigate(['/user-profile']);
    } else if (index === 2) {
      this.userService.removeUserFromLocalStorage();
      this.tokenService.removeToken();
      this.userResponse = this.userService.getUserResponseFromLocalStorage();
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item
  }

  logout(): void {
    this.tokenService.removeToken();
    this.isLoggedIn = false;  // Cập nhật lại trạng thái là chưa đăng nhập
  }

  updateCartTotal(): void {
    console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      // If the user is logged in, get the total item count from the API
      const userId = this.tokenService.getUserId();
      this.cartService.getTotalItemUrl(userId).subscribe(
        (response) => {
          console.log(response); // Check API response
          console.log(response.totalItem);
          if (response && response.totalItem !== undefined) {
            this.totalItems = response.totalItem;

          } else {
            console.error('No totalItem data from API');
            this.fallbackToLocalStorage(); // Use localStorage if API data is missing
          }
        },
        (error) => {
          console.error('Error fetching data from API:', error);
          this.fallbackToLocalStorage(); // Fallback to localStorage on error
        }
      );
    } else {
      // If the user is not logged in, fetch the total items from localStorage
      if (isPlatformBrowser(this.platformId)) {
        const guestCart = this.getCartFromLocalStorage();
        this.totalItems = guestCart.reduce((sum, item) => sum + item.quantity, 0);
      }
    }
  }

// Fallback to localStorage if the API fails or returns missing data
  fallbackToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const guestCart = this.getCartFromLocalStorage();
      this.totalItems = guestCart.reduce((sum, item) => sum + item.quantity, 0);
    }
  }

  getCartFromLocalStorage(): any[] {
    // Fetch the cart from localStorage if running in the browser
    const cart = localStorage.getItem('guestCart');
    return cart ? JSON.parse(cart) : [];
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }
}

