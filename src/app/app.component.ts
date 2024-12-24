import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Route, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes} from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import AOS from 'aos';
import {isPlatformBrowser, NgIf} from '@angular/common';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './components/signin/signin.component';
import { OTPComponent } from './components/OTP/OTP.component';
import { CartComponent } from './components/cart/cart.component';
import {PaymentsComponent} from './components/payments/payments.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './components/profile/profile.component';
import {AddressListComponent} from './components/address-list/address-list.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {ChatbotComponent} from './components/chat/chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CartComponent,
    RouterLink,
    HeaderComponent, SigninComponent, OTPComponent,
    FooterComponent, HomeComponent, ProductsComponent, DetailProductComponent, ReactiveFormsModule
    , PaymentsComponent, ProfileComponent, AddressListComponent, WishlistComponent, NgIf, ChatbotComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent  {
  title = 'Profect_Shopping';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private router: Router) {
    this.router.events.subscribe(() => {
      this.isAdminPage = this.router.url.startsWith('/admin');
    });
  }
  isAdminPage: boolean = false;
  ngOnInit() {
    // Chỉ khởi tạo AOS khi chạy trên trình duyệt
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({});}

  }




}
