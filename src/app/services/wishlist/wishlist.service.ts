import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WishlistResponse} from '../../model/wishlist/WishlistResponse';
import {WishlistDTO} from '../../model/wishlist/WishlistDTO';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl: string = `${environment.apiBaseUrl}/api/v1`;

  constructor(private http: HttpClient) { }

  getWishlistData(idUser: number) : Observable<WishlistResponse> {
    return this.http.get<WishlistResponse>(`${this.apiUrl}/wishlist?userId=${idUser}`);
  }

  deleteWishlistItem(wishlistId : number): Observable<{ wishlistResponse : WishlistResponse }>{
    return this.http.delete<{ wishlistResponse : WishlistResponse }>(`${this.apiUrl}/wishlist?wishlistId=${wishlistId}`);
  }

  addToWishlist(userId: number, wishlistDTO : WishlistDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/wishlist?userId=${userId}`, wishlistDTO);
  }
}
