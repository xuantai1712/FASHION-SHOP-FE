import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {DetailProduct} from '../../model/detail-product/DetailProduct';
import {ReviewsResponse} from '../../model/reviewsResponse';

@Injectable({
  providedIn: 'root'
})
export class DetailProductService {
private apiUrl = `${environment.apiBaseUrl}/api/v1`
  constructor(private http: HttpClient) { }


  getUrlDetailProduct (idProduct :number,colorId: number,sizeId : number ): Observable<DetailProduct>{
  return this.http.get<DetailProduct>(`${this.apiUrl}/products/${idProduct}?colorId=${colorId}&sizeId=${sizeId}`);
  }


  getPriceBySizeAndColor(sizeId: number, colorId: number): Observable<any> {
    const url = `${this.apiUrl}?sizeId=${sizeId}&colorId=${colorId}`;
    return this.http.get<any>(url);
  }

  getReviews(productId: number | undefined, page: number = 0, size: number = 3): Observable<ReviewsResponse> {
    return this.http.get<ReviewsResponse>(`${this.apiUrl}/reviews?productId=${productId}&page=${page}&size=${size}`);
  }

}
