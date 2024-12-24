import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {WishlistResponse} from '../../model/wishlist/WishlistResponse';
import {CartItem} from '../../model/cart/CartItem';
import {WishlistItem} from '../../model/wishlist/WishlistItem';
import {AddressService} from '../../services/address/address.service';
import {WishlistService} from '../../services/wishlist/wishlist.service';
import {TokenService} from '../../services/token/token.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  listWishlistResponse?: WishlistResponse;
  listWishlistItem?: WishlistItem[];
  userid : number = 0;

  constructor(
    private WishlistService: WishlistService,
    private tokenService: TokenService,
  ) { }



  ngOnInit() {
    this.userid = this.tokenService.getUserId();
    this.loadWishlist(this.userid);//chuyền user id
  }

  deleteWishlist(id: number) {
    this.WishlistService.deleteWishlistItem(id).subscribe(() => {
      this.loadWishlist(this.userid);//chuyền user id
    });
  }

  loadWishlist(userId: number): void {
    this.WishlistService.getWishlistData(userId).subscribe(
      (dataWishlist: WishlistResponse) => {
        this.listWishlistResponse = dataWishlist;
        this.listWishlistItem = dataWishlist.wishlistItems;

        // Nếu bạn muốn kiểm tra các phần tử trong WishlistItems:
        if (this.listWishlistResponse && this.listWishlistResponse.wishlistItems) {
          this.listWishlistItem.forEach(item => {
            console.log(item.productName);
          });
        } else {
          console.log("WishlistItems is undefined or empty");
        }
      },
      error => {
        console.error("Error loading wishlist:", error);
      }
    );
  }
}

