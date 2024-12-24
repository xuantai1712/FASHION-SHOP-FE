import {provideRouter, Routes, RouterLink} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ProductsComponent} from './components/products/products.component';
import {DetailProductComponent} from './components/detail-product/detail-product.component';
import {LoginComponent} from './components/login/login.component';
import {SigninComponent} from './components/signin/signin.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {CartComponent} from './components/cart/cart.component';
import {PaymentsComponent} from './components/payments/payments.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import {AuthGuardFn} from './guards/auth.guard';
import {AdminComponent} from './components/admin/admin.component';
import {AdminGuardFn} from './guards/admin.guard';
import {ProfileComponent} from './components/profile/profile.component';
import {AddressListComponent} from './components/address-list/address-list.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {OrderDetailsComponent} from './components/order-details/order-details.component';
import {OTPComponent} from './components/OTP/OTP.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'detail_product', component: DetailProductComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'forgotPass', component: ForgotPasswordComponent},
  {path: 'resetPassword', component: ResetPasswordComponent},
  {path: 'cart', component: CartComponent},
  {path: 'OTP', component: OTPComponent},
  {path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuardFn]},
  {path: 'payments', component: PaymentsComponent, canActivate: [AuthGuardFn]},
  {path: 'detail_product/:productId/:colorId/:sizeId', component: DetailProductComponent},
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuardFn] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardFn] },
  { path: 'addresses_list', component: AddressListComponent, canActivate: [AuthGuardFn] },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuardFn] },
  { path: 'order/:orderId', component: OrderDetailsComponent, canActivate: [AuthGuardFn] },
  { path: 'order/:orderId', component: OrderDetailsComponent },

//admin
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardFn]
  },
];
